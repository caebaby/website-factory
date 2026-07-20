import json
from pathlib import Path

from docx import Document
from docx.enum.section import WD_ORIENT
from docx.enum.table import WD_CELL_VERTICAL_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Inches, Pt, RGBColor
from lxml import html

from build_current_copy_review import BUILD, PAGES, extract_copy


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "copy" / "Anchor_Copy_Review_Side_by_Side.docx"

NAVY = "0F2038"
BLUE = "2D5474"
BODY = "425B72"
GOLD = "B18F4D"
LINE = "D5DDE5"
PALE_BLUE = "EEF3F6"
PALE_GOLD = "FFF9ED"
WHITE = "FFFFFF"

# compact_reference_guide with named form overrides:
# - US Letter landscape; 0.60in margins for a usable two-column form
# - 9.7167in table + 0.0833in indent = 9.80in content width
# - 9.5pt table body for long side-by-side copy, 1.15 line spacing
TABLE_WIDTH_DXA = 13972
TABLE_INDENT_DXA = 140
COLUMN_WIDTHS_DXA = [6986, 6986]
CELL_MARGINS_DXA = {"top": 100, "bottom": 100, "start": 140, "end": 140}


GLOBAL_BLOCKS = [
    (
        "Primary navigation",
        [
            "Homepage: About · Team · Who We Serve · Resources · Process · Book a Call",
            "Content pages: About · Team · Who We Serve · Resources · Take the Fit Check",
        ],
        "Confirm the labels and preferred primary action on both homepage and content pages.",
    ),
    (
        "Brand line",
        ["\"Charting the course towards your financial legacy.\""],
        "Keep it, revise it, or provide a replacement.",
    ),
    (
        "Firm description",
        ["Houston-based fiduciary wealth management for oil & gas executives, business owners, and high-net-worth families."],
        "Confirm every descriptor and audience label is accurate and approved.",
    ),
    (
        "Legal footer placeholder",
        ["[VERIFY: RIA entity name] is a registered investment advisor. Information presented is for educational purposes only and does not intend to make an offer or solicitation for the sale or purchase of any specific securities, investments, or investment strategies. Investments involve risk and unless otherwise stated, are not guaranteed. Past performance is not a guarantee of future results."],
        "Compliance-approved replacement required before launch.",
    ),
    (
        "Other current disclosure variants",
        [
            "About / Team: [VERIFY: RIA entity name and approved regulatory disclosure before launch.] © 2026 Anchor Wealth Planning.",
            "Audience pages: Educational content only. [VERIFY full regulatory disclosure before launch.]",
            "Resources / Article: Educational information only. This material is not individualized tax, legal, or investment advice. Consult the appropriate qualified professionals before acting. © 2026 Anchor Wealth Planning.",
            "Podcast: Educational information only. Podcast content is not individualized tax, legal, or investment advice. Consult the appropriate qualified professionals before acting. © 2026 Anchor Wealth Planning.",
        ],
        "Provide one compliance-approved system and identify any page-specific variants.",
    ),
    (
        "Content-page footer description",
        [
            "Houston-based coordinated wealth planning.",
            "Coordinated planning for Houston executives, business owners, and families with complex financial lives.",
        ],
        "Approve or replace this repeated footer positioning statement.",
    ),
    (
        "Footer navigation labels",
        [
            "Homepage Explore: About · Team · Services · Resources · Contact",
            "Homepage Specialties: Oil & Gas Executives · Business Owners · HNW Families · Equity Compensation · Estate & Legacy · Coordinated Planning",
            "Content pages: Explore · Start · Who We Serve · Take the Fit Check · Oil and Gas Executives",
        ],
        "Confirm the footer labels and destinations.",
    ),
    (
        "Repeated Fit Check footer",
        [
            "The Anchor Fit Check",
            "Four questions. A better first conversation.",
            "See whether your situation, timing, and coordination needs match the way Anchor works.",
            "01 Your situation · 02 Current complexity · 03 Coordination gap · 04 Best next step.",
            "CTA: Start the Fit Check.",
        ],
        "Approve the promise, steps, and CTA wording.",
    ),
]

HERO_BLOCKS = [
    (
        "Hero positioning label",
        ["Houston, TX · Fiduciary Wealth Management"],
        "Confirm the location and whether fiduciary language is approved.",
    ),
    (
        "Rotating hero — Oil & Gas",
        [
            "When your equity vests, who sees the whole picture?",
            "RSUs, deferred comp, blackout periods, commodity cycles. Anchor coordinates your investments, taxes, and estate plan with your CPA and attorney — so every vest, bonus, and decision happens in context.",
        ],
        "Approve the headline and description for the lead hero.",
    ),
    (
        "Rotating hero — Business Owners",
        [
            "Your business is your largest asset. What’s the plan for it?",
            "Entity structure, exit timing, liquidity events, and the line between business value and personal wealth. Anchor starts the planning conversation years before the LOI arrives.",
        ],
        "Approve or replace the business-owner hero copy.",
    ),
    (
        "Rotating hero — Families",
        [
            "Your wealth grew. Did your plan keep up?",
            "Trust funding, beneficiary reviews, multi-generational coordination. Anchor keeps your CPA, attorney, and advisor reading from the same page — so your estate matches your actual net worth.",
        ],
        "Approve or replace the family hero copy.",
    ),
    (
        "Hero actions and proof",
        [
            "Market tabs: 01 Oil & Gas · 02 Business Owners · 03 Families",
            "CTA: Schedule a 30-Minute Conversation",
            "CTA: Take the 4-Question Fit Check",
            "[Credential 01] · [Credential 02] · [XX]+ yrs · Houston-based",
        ],
        "Confirm the conversion path and supply verified proof.",
    ),
]


def set_font(run, size=None, color=None, bold=None, italic=None):
    run.font.name = "Calibri"
    run._element.get_or_add_rPr().rFonts.set(qn("w:ascii"), "Calibri")
    run._element.get_or_add_rPr().rFonts.set(qn("w:hAnsi"), "Calibri")
    if size is not None:
        run.font.size = Pt(size)
    if color is not None:
        run.font.color.rgb = RGBColor.from_string(color)
    if bold is not None:
        run.bold = bold
    if italic is not None:
        run.italic = italic


def set_shading(cell, fill):
    tc_pr = cell._tc.get_or_add_tcPr()
    shd = tc_pr.find(qn("w:shd"))
    if shd is None:
        shd = OxmlElement("w:shd")
        tc_pr.append(shd)
    shd.set(qn("w:fill"), fill)


def set_cell_margins(cell):
    tc_pr = cell._tc.get_or_add_tcPr()
    margins = tc_pr.find(qn("w:tcMar"))
    if margins is None:
        margins = OxmlElement("w:tcMar")
        tc_pr.append(margins)
    for side, value in CELL_MARGINS_DXA.items():
        node = margins.find(qn(f"w:{side}"))
        if node is None:
            node = OxmlElement(f"w:{side}")
            margins.append(node)
        node.set(qn("w:w"), str(value))
        node.set(qn("w:type"), "dxa")


def set_cell_width(cell, width_dxa):
    tc_pr = cell._tc.get_or_add_tcPr()
    tc_w = tc_pr.find(qn("w:tcW"))
    if tc_w is None:
        tc_w = OxmlElement("w:tcW")
        tc_pr.append(tc_w)
    tc_w.set(qn("w:w"), str(width_dxa))
    tc_w.set(qn("w:type"), "dxa")


def set_table_geometry(table):
    table.autofit = False
    tbl_pr = table._tbl.tblPr
    tbl_w = tbl_pr.find(qn("w:tblW"))
    if tbl_w is None:
        tbl_w = OxmlElement("w:tblW")
        tbl_pr.append(tbl_w)
    tbl_w.set(qn("w:w"), str(TABLE_WIDTH_DXA))
    tbl_w.set(qn("w:type"), "dxa")

    tbl_ind = tbl_pr.find(qn("w:tblInd"))
    if tbl_ind is None:
        tbl_ind = OxmlElement("w:tblInd")
        tbl_pr.append(tbl_ind)
    tbl_ind.set(qn("w:w"), str(TABLE_INDENT_DXA))
    tbl_ind.set(qn("w:type"), "dxa")

    grid = table._tbl.tblGrid
    for child in list(grid):
        grid.remove(child)
    for width in COLUMN_WIDTHS_DXA:
        col = OxmlElement("w:gridCol")
        col.set(qn("w:w"), str(width))
        grid.append(col)

    for row in table.rows:
        for index, cell in enumerate(row.cells):
            set_cell_width(cell, COLUMN_WIDTHS_DXA[index])
            set_cell_margins(cell)
            cell.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.TOP


def set_table_borders(table):
    tbl_pr = table._tbl.tblPr
    borders = tbl_pr.find(qn("w:tblBorders"))
    if borders is None:
        borders = OxmlElement("w:tblBorders")
        tbl_pr.append(borders)
    for edge in ["top", "left", "bottom", "right", "insideH", "insideV"]:
        node = borders.find(qn(f"w:{edge}"))
        if node is None:
            node = OxmlElement(f"w:{edge}")
            borders.append(node)
        node.set(qn("w:val"), "single")
        node.set(qn("w:sz"), "6")
        node.set(qn("w:space"), "0")
        node.set(qn("w:color"), LINE)


def repeat_header_row(row):
    tr_pr = row._tr.get_or_add_trPr()
    marker = OxmlElement("w:tblHeader")
    marker.set(qn("w:val"), "true")
    tr_pr.append(marker)


def prevent_row_split(row):
    tr_pr = row._tr.get_or_add_trPr()
    marker = OxmlElement("w:cantSplit")
    marker.set(qn("w:val"), "true")
    tr_pr.append(marker)


def add_page_field(paragraph):
    run = paragraph.add_run()
    begin = OxmlElement("w:fldChar")
    begin.set(qn("w:fldCharType"), "begin")
    instruction = OxmlElement("w:instrText")
    instruction.set(qn("xml:space"), "preserve")
    instruction.text = " PAGE "
    end = OxmlElement("w:fldChar")
    end.set(qn("w:fldCharType"), "end")
    run._r.extend([begin, instruction, end])


def configure_document(doc):
    section = doc.sections[0]
    section.orientation = WD_ORIENT.LANDSCAPE
    section.page_width = Inches(11)
    section.page_height = Inches(8.5)
    section.top_margin = Inches(0.60)
    section.bottom_margin = Inches(0.60)
    section.left_margin = Inches(0.60)
    section.right_margin = Inches(0.60)
    section.header_distance = Inches(0.30)
    section.footer_distance = Inches(0.30)

    normal = doc.styles["Normal"]
    normal.font.name = "Calibri"
    normal._element.rPr.rFonts.set(qn("w:ascii"), "Calibri")
    normal._element.rPr.rFonts.set(qn("w:hAnsi"), "Calibri")
    normal.font.size = Pt(10)
    normal.font.color.rgb = RGBColor.from_string(BODY)
    normal.paragraph_format.space_before = Pt(0)
    normal.paragraph_format.space_after = Pt(4)
    normal.paragraph_format.line_spacing = 1.15

    for style_name, size, before, after, color in [
        ("Heading 1", 18, 12, 7, NAVY),
        ("Heading 2", 13, 10, 5, BLUE),
        ("Heading 3", 11, 7, 4, NAVY),
    ]:
        style = doc.styles[style_name]
        style.font.name = "Calibri"
        style._element.rPr.rFonts.set(qn("w:ascii"), "Calibri")
        style._element.rPr.rFonts.set(qn("w:hAnsi"), "Calibri")
        style.font.size = Pt(size)
        style.font.bold = True
        style.font.color.rgb = RGBColor.from_string(color)
        style.paragraph_format.space_before = Pt(before)
        style.paragraph_format.space_after = Pt(after)
        style.paragraph_format.keep_with_next = True

    header = section.header.paragraphs[0]
    r = header.add_run("ANCHOR WEALTH PLANNING  |  COPY REVIEW WORKBOOK")
    set_font(r, size=8, color=BODY, bold=True)

    footer = section.footer.paragraphs[0]
    footer.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    r = footer.add_run("Alex copy review  |  ")
    set_font(r, size=8, color=BODY)
    add_page_field(footer)


def clear_cell(cell):
    cell.text = ""
    paragraph = cell.paragraphs[0]
    paragraph.paragraph_format.space_after = Pt(3)
    return paragraph


def add_small_label(cell, text, color=GOLD):
    p = cell.add_paragraph()
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(4)
    r = p.add_run(text.upper())
    set_font(r, size=7.5, color=color, bold=True)


def add_header_row(table):
    row = table.rows[0]
    repeat_header_row(row)
    labels = ["CURRENT WEBSITE COPY", "ALEX'S VERSION / CHANGES"]
    for cell, label in zip(row.cells, labels):
        p = clear_cell(cell)
        p.alignment = WD_ALIGN_PARAGRAPH.LEFT
        r = p.add_run(label)
        set_font(r, size=9, color=WHITE, bold=True)
        set_shading(cell, NAVY)


def change_prompt(title, text, default_prompt):
    if default_prompt:
        return default_prompt
    combined = f"{title} {' '.join(text)}".lower()
    if any(token in combined for token in ["[verify", "credential", "accolade", "years", "registered investment advisor"]):
        return "Verified fact or compliance-approved replacement required."
    if any(token in combined for token in ["fit check", "cta:", "schedule", "book a call"]):
        return "Keep the action or type the preferred CTA and next step."
    return "Keep, edit, or replace this copy."


def add_copy_row(table, title, text, prompt=None):
    row = table.add_row()
    prevent_row_split(row)
    left, right = row.cells
    set_shading(left, WHITE)
    set_shading(right, PALE_GOLD)

    clear_cell(left)
    add_small_label(left, "Section / copy block")
    p = left.add_paragraph()
    p.paragraph_format.space_after = Pt(5)
    r = p.add_run(title)
    set_font(r, size=10.5, color=NAVY, bold=True)
    for item in text:
        if not item:
            continue
        p = left.add_paragraph()
        p.paragraph_format.space_after = Pt(4)
        r = p.add_run(item)
        set_font(r, size=9.5, color=BODY)

    clear_cell(right)
    add_small_label(right, "Decision", color=BLUE)
    p = right.add_paragraph()
    p.paragraph_format.space_after = Pt(5)
    r = p.add_run("Keep  /  Edit  /  Replace")
    set_font(r, size=9.5, color=NAVY, bold=True)
    p = right.add_paragraph()
    p.paragraph_format.space_after = Pt(8)
    r = p.add_run(change_prompt(title, text, prompt))
    set_font(r, size=8.5, color=BODY, italic=True)
    p = right.add_paragraph()
    p.paragraph_format.space_after = Pt(4)
    r = p.add_run("Alex's replacement copy or notes:")
    set_font(r, size=8.5, color=BLUE, bold=True)
    for _ in range(3):
        p = right.add_paragraph()
        p.paragraph_format.space_after = Pt(9)
        r = p.add_run(" ")
        set_font(r, size=9.5, color=BODY)


def add_decision_row(table, prompts):
    row = table.add_row()
    prevent_row_split(row)
    left, right = row.cells
    set_shading(left, PALE_BLUE)
    set_shading(right, PALE_GOLD)
    clear_cell(left)
    add_small_label(left, "Page-level decisions", color=BLUE)
    for number, prompt in enumerate(prompts, 1):
        p = left.add_paragraph()
        p.paragraph_format.left_indent = Inches(0.18)
        p.paragraph_format.first_line_indent = Inches(-0.18)
        p.paragraph_format.space_after = Pt(3)
        r = p.add_run(f"{number}. {prompt}")
        set_font(r, size=8.7, color=BODY)

    clear_cell(right)
    add_small_label(right, "Alex's answers", color=BLUE)
    p = right.add_paragraph()
    p.paragraph_format.space_after = Pt(6)
    r = p.add_run("Type answers here. Short, plain-language answers are fine.")
    set_font(r, size=8.5, color=BODY, italic=True)
    for _ in range(max(4, min(8, len(prompts)))):
        p = right.add_paragraph()
        p.paragraph_format.space_after = Pt(8)
        p.add_run(" ")


def metadata_block_for_page(filename):
    tree = html.fromstring((BUILD / filename).read_text(encoding="utf-8"))
    values = []

    title = tree.xpath("string(//title)").strip()
    if title:
        values.append(f"SEO TITLE: {title}")

    for label, xpath in [
        ("META DESCRIPTION", "//meta[@name='description']/@content"),
        ("AUTHOR", "//meta[@name='author']/@content"),
        ("SOCIAL TITLE", "//meta[@property='og:title']/@content"),
        ("SOCIAL DESCRIPTION", "//meta[@property='og:description']/@content"),
    ]:
        result = tree.xpath(xpath)
        if result:
            value = " ".join(result[0].split())
            if value and value not in " ".join(values):
                values.append(f"{label}: {value}")

    schema_summaries = []
    for node in tree.xpath("//script[@type='application/ld+json']/text()"):
        try:
            data = json.loads(node)
        except (TypeError, ValueError):
            continue
        records = data.get("@graph", []) if isinstance(data, dict) and "@graph" in data else [data]
        for record in records:
            if not isinstance(record, dict):
                continue
            schema_type = record.get("@type")
            if isinstance(schema_type, list):
                schema_type = ", ".join(schema_type)
            headline = record.get("headline") or record.get("name")
            description = record.get("description")
            author = record.get("author")
            author_name = author.get("name") if isinstance(author, dict) else None
            date_published = record.get("datePublished")
            details = [str(value) for value in [schema_type, headline, description, author_name, date_published] if value]
            if details:
                schema_summaries.append(" · ".join(details))
    if schema_summaries:
        values.append("STRUCTURED DATA: " + " | ".join(schema_summaries))

    return (
        "SEO, social, and GEO metadata",
        values or ["No page-specific SEO metadata is currently present."],
        "Approve the search/social wording and verify every person, organization, date, and schema fact.",
    )


def accessibility_block_for_page(filename):
    tree = html.fromstring((BUILD / filename).read_text(encoding="utf-8"))
    values = []

    def add(label, value):
        value = " ".join((value or "").split())
        item = f"{label}: {value}" if value else ""
        if item and item not in values:
            values.append(item)

    for value in tree.xpath("//img/@alt"):
        add("IMAGE ALT", value)
    for value in tree.xpath("//input[@placeholder]/@placeholder"):
        add("FORM PLACEHOLDER", value)
    for element in tree.xpath("//*[contains(concat(' ', normalize-space(@class), ' '), ' sr-only ')]"):
        add("SCREEN-READER LABEL", element.text_content())
    for value in tree.xpath("//*[@aria-label]/@aria-label"):
        add("INTERFACE LABEL", value)

    if not values:
        return None
    return (
        "Accessibility and interface text",
        values,
        "Confirm image descriptions and page-specific labels; standard navigation/control labels can remain unless inaccurate.",
    )


def blocks_for_page(filename):
    blocks = []
    title = "Page introduction"
    parts = []
    pending_label = None
    pending_details = []

    def flush(force=False):
        nonlocal title, parts
        cleaned = [part for part in parts if part]
        if cleaned or (force and title not in {"Page introduction", "Copy block"}):
            blocks.append((title, cleaned))
        title = "Copy block"
        parts = []

    for tag, text, classes in extract_copy(BUILD / filename):
        if "eyebrow" in classes:
            flush()
            pending_label = text
            continue
        is_lead_detail = (
            (tag == "small" and (text.startswith("Step ") or " · " in text or text.endswith("preview")))
            or bool(classes.intersection({"chapter-number", "reel-tag", "serve-card-tag"}))
        )
        if is_lead_detail:
            flush()
            if "chapter-number" in classes:
                pending_details.append(f"CHAPTER: {text}")
            elif classes.intersection({"reel-tag", "serve-card-tag"}):
                pending_details.append(f"LABEL: {text}")
            else:
                pending_details.append(f"DETAIL LABEL: {text}")
            continue
        if tag in {"h1", "h2", "h3", "h4", "legend", "strong"}:
            flush(force=True)
            title = text
            if pending_label:
                parts.append(f"SECTION LABEL: {pending_label}")
                pending_label = None
            if pending_details:
                parts.extend(pending_details)
                pending_details = []
            continue

        if pending_label:
            flush()
            title = pending_label
            pending_label = None

        if tag == "label":
            parts.append(f"OPTION: {text}")
        elif tag == "li":
            parts.append(text)
        elif tag in {"a", "button"}:
            parts.append(f"CTA / LINK: {text}")
        elif tag == "small":
            parts.append(f"DETAIL LABEL: {text}")
        elif tag == "figcaption":
            parts.append(f"IMAGE CAPTION: {text}")
        elif tag == "summary":
            parts.append(f"EXPANDER LABEL: {text}")
        elif "svc-card-pain" in classes:
            parts.append(f"SUPPORTING QUOTE: {text}")
        elif "when" in classes:
            parts.append(f"TIMING LABEL: {text}")
        elif classes.intersection({"trust-status", "tag", "chip", "reel-tag", "serve-card-tag"}):
            parts.append(f"LABEL: {text}")
        else:
            parts.append(text)
    if pending_label:
        flush()
        title = pending_label
        pending_label = None
    if pending_details:
        flush()
        title = "Detail labels"
        parts.extend(pending_details)
        pending_details = []
    flush(force=True)
    return blocks


def add_page_heading(doc, kicker, title, url=None):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(2)
    r = p.add_run(kicker.upper())
    set_font(r, size=8, color=GOLD, bold=True)
    doc.add_paragraph(title, style="Heading 1")
    if url:
        p = doc.add_paragraph()
        p.paragraph_format.space_after = Pt(8)
        r = p.add_run(url)
        set_font(r, size=8, color=BLUE)


def new_review_table(doc):
    table = doc.add_table(rows=1, cols=2)
    set_table_geometry(table)
    set_table_borders(table)
    add_header_row(table)
    return table


def build():
    doc = Document()
    configure_document(doc)

    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(3)
    r = p.add_run("CLIENT COPY WORKBOOK")
    set_font(r, size=9, color=GOLD, bold=True)
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(6)
    r = p.add_run("Anchor Website Copy Review")
    set_font(r, size=24, color=NAVY, bold=True)
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(10)
    r = p.add_run("Current copy is on the left. Alex types the replacement wording, corrections, or notes directly into the box on the right.")
    set_font(r, size=11, color=BODY)

    instruction_table = new_review_table(doc)
    add_copy_row(
        instruction_table,
        "How to complete the review",
        [
            "1. Choose Keep, Edit, or Replace for each copy block.",
            "2. Type changes directly into the right-hand cell.",
            "3. Plain-language notes are fine; the final copy can be polished afterward.",
            "4. Do not guess facts. Mark uncertain credentials, claims, fees, or disclosures for verification.",
            "5. Save the completed Word file and upload it back to the project or an AI.",
        ],
        "Use this first box for any overall direction or voice notes.",
    )

    doc.add_page_break()
    add_page_heading(doc, "Global copy", "Navigation, positioning, legal, and Fit Check")
    table = new_review_table(doc)
    for title, text, prompt in GLOBAL_BLOCKS:
        add_copy_row(table, title, text, prompt)

    for page_title, filename, url, prompts in PAGES:
        doc.add_page_break()
        add_page_heading(doc, "Page review", page_title, url)
        table = new_review_table(doc)
        add_decision_row(table, prompts)
        meta_title, meta_text, meta_prompt = metadata_block_for_page(filename)
        add_copy_row(table, meta_title, meta_text, meta_prompt)
        accessibility_block = accessibility_block_for_page(filename)
        if accessibility_block:
            a11y_title, a11y_text, a11y_prompt = accessibility_block
            add_copy_row(table, a11y_title, a11y_text, a11y_prompt)
        if filename == "home-v6.html":
            for title, text, prompt in HERO_BLOCKS:
                add_copy_row(table, title, text, prompt)
        for title, text in blocks_for_page(filename):
            add_copy_row(table, title, text)

    doc.core_properties.title = "Anchor Website Copy Review — Side by Side"
    doc.core_properties.subject = "Editable client copy review workbook"
    doc.core_properties.author = "Website Factory"
    doc.core_properties.keywords = "Anchor Wealth Planning, copy review, Alex Miller"
    doc.save(OUTPUT)
    return OUTPUT


if __name__ == "__main__":
    print(build())
