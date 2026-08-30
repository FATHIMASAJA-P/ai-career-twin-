from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    PageBreak,
    Table,
    TableStyle,
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.pagesizes import A4
from reportlab.lib.enums import TA_CENTER
from reportlab.lib import colors
from reportlab.lib.units import mm
import os
import json
import html


def generate_pdf_report(
    filename,
    user_name,
    career_analysis,
    ats_score,
    job_match
):
    os.makedirs("reports", exist_ok=True)

    pdf_path = os.path.join("reports", filename)

    # --------------------------------------------------
    # Document
    # --------------------------------------------------

    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=A4,
        rightMargin=18 * mm,
        leftMargin=18 * mm,
        topMargin=18 * mm,
        bottomMargin=18 * mm,
    )

    # --------------------------------------------------
    # Styles
    # --------------------------------------------------

    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        "ReportTitle",
        parent=styles["Title"],
        fontSize=24,
        leading=30,
        alignment=TA_CENTER,
        spaceAfter=8,
    )

    subtitle_style = ParagraphStyle(
        "Subtitle",
        parent=styles["Normal"],
        fontSize=11,
        alignment=TA_CENTER,
        spaceAfter=20,
    )

    section_style = ParagraphStyle(
        "Section",
        parent=styles["Heading2"],
        fontSize=16,
        leading=20,
        spaceBefore=12,
        spaceAfter=10,
    )

    subheading_style = ParagraphStyle(
        "SubHeading",
        parent=styles["Heading3"],
        fontSize=12,
        leading=16,
        spaceBefore=8,
        spaceAfter=5,
    )

    body_style = ParagraphStyle(
        "Body",
        parent=styles["BodyText"],
        fontSize=9.5,
        leading=14,
        spaceAfter=5,
    )

    bullet_style = ParagraphStyle(
        "Bullet",
        parent=body_style,
        leftIndent=12,
        firstLineIndent=-8,
        spaceAfter=4,
    )

    score_style = ParagraphStyle(
        "Score",
        parent=styles["Heading1"],
        fontSize=25,
        leading=30,
        alignment=TA_CENTER,
    )

    # --------------------------------------------------
    # Helper functions
    # --------------------------------------------------

    def safe_text(value):
        if value is None:
            return ""

        return html.escape(str(value))

    def bullet_list(items):
        result = []

        if not items:
            result.append(
                Paragraph("No information available.", body_style)
            )
            return result

        for item in items:
            result.append(
                Paragraph(
                    f"• {safe_text(item)}",
                    bullet_style
                )
            )

        return result

    def parse_json(value):
        if not value:
            return {}

        if isinstance(value, dict):
            return value

        try:
            return json.loads(value)
        except Exception:
            return {}

    # --------------------------------------------------
    # Parse AI results
    # --------------------------------------------------

    career_data = parse_json(career_analysis)
    ats_data = parse_json(ats_score)
    job_data = parse_json(job_match)

    story = []

    # --------------------------------------------------
    # Cover
    # --------------------------------------------------

    story.append(
        Spacer(1, 20 * mm)
    )

    story.append(
        Paragraph(
            "AI Career Twin",
            title_style
        )
    )

    story.append(
        Paragraph(
            "Personalized AI Career Report",
            subtitle_style
        )
    )

    story.append(
        Spacer(1, 8 * mm)
    )

    profile_table = Table(
        [
            [
                Paragraph("<b>Candidate</b>", body_style),
                Paragraph(safe_text(user_name), body_style),
            ],
            [
                Paragraph("<b>Report</b>", body_style),
                Paragraph("AI Career Assessment", body_style),
            ],
        ],
        colWidths=[45 * mm, 110 * mm],
    )

    profile_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (0, -1), colors.lightgrey),
                ("BOX", (0, 0), (-1, -1), 0.7, colors.grey),
                ("INNERGRID", (0, 0), (-1, -1), 0.4, colors.grey),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )

    story.append(profile_table)

    story.append(
        Spacer(1, 15 * mm)
    )

    story.append(
        Paragraph(
            "This report summarizes your AI-powered career analysis, "
            "ATS compatibility, and job matching results.",
            body_style,
        )
    )

    story.append(PageBreak())

    # --------------------------------------------------
    # Career Analysis
    # --------------------------------------------------

    story.append(
        Paragraph(
            "🤖 Career Analysis",
            section_style
        )
    )

    career_score = career_data.get(
        "career_readiness_score",
        "N/A"
    )

    # Handle old 75-style score
    try:
        score_number = float(career_score)

        if score_number > 10:
            score_number = score_number / 10

        career_score_display = f"{score_number:.1f} / 10"

    except Exception:
        career_score_display = safe_text(career_score)

    score_table = Table(
        [
            [
                Paragraph(
                    career_score_display,
                    score_style
                )
            ]
        ],
        colWidths=[65 * mm],
        rowHeights=[30 * mm],
    )

    score_table.setStyle(
        TableStyle(
            [
                ("BOX", (0, 0), (-1, -1), 1, colors.grey),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("ALIGN", (0, 0), (-1, -1), "CENTER"),
            ]
        )
    )

    story.append(score_table)

    story.append(
        Paragraph(
            "Career Readiness Score",
            subheading_style
        )
    )

    story.append(
        Paragraph(
            "<b>Strengths</b>",
            subheading_style
        )
    )

    story.extend(
        bullet_list(
            career_data.get("strengths", [])
        )
    )

    story.append(
        Paragraph(
            "<b>Missing Skills</b>",
            subheading_style
        )
    )

    story.extend(
        bullet_list(
            career_data.get("missing_skills", [])
        )
    )

    story.append(
        Paragraph(
            "<b>Learning Roadmap</b>",
            subheading_style
        )
    )

    story.extend(
        bullet_list(
            career_data.get("learning_roadmap", [])
        )
    )

    story.append(
        Paragraph(
            "<b>Recommended Job Roles</b>",
            subheading_style
        )
    )

    story.extend(
        bullet_list(
            career_data.get("recommended_job_roles", [])
        )
    )

    story.append(
        Paragraph(
            "<b>Mentor Advice</b>",
            subheading_style
        )
    )

    story.append(
        Paragraph(
            safe_text(
                career_data.get(
                    "mentor_advice",
                    "Not available."
                )
            ),
            body_style,
        )
    )

    # --------------------------------------------------
    # ATS Score
    # --------------------------------------------------

    story.append(PageBreak())

    story.append(
        Paragraph(
            "📊 ATS Resume Score",
            section_style
        )
    )

    ats_number = ats_data.get(
        "ats_score",
        "N/A"
    )

    ats_score_table = Table(
        [
            [
                Paragraph(
                    f"{safe_text(ats_number)} / 100",
                    score_style
                )
            ]
        ],
        colWidths=[65 * mm],
        rowHeights=[30 * mm],
    )

    ats_score_table.setStyle(
        TableStyle(
            [
                ("BOX", (0, 0), (-1, -1), 1, colors.grey),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("ALIGN", (0, 0), (-1, -1), "CENTER"),
            ]
        )
    )

    story.append(ats_score_table)

    story.append(
        Paragraph(
            "<b>Resume Strengths</b>",
            subheading_style
        )
    )

    story.extend(
        bullet_list(
            ats_data.get("strengths", [])
        )
    )

    story.append(
        Paragraph(
            "<b>Missing Keywords</b>",
            subheading_style
        )
    )

    story.extend(
        bullet_list(
            ats_data.get("missing_keywords", [])
        )
    )

    story.append(
        Paragraph(
            "<b>Resume Improvements</b>",
            subheading_style
        )
    )

    story.extend(
        bullet_list(
            ats_data.get("resume_improvements", [])
        )
    )

    story.append(
        Paragraph(
            "<b>Final Verdict</b>",
            subheading_style
        )
    )

    story.append(
        Paragraph(
            safe_text(
                ats_data.get(
                    "final_verdict",
                    "Not available."
                )
            ),
            body_style,
        )
    )

    # --------------------------------------------------
    # Job Match
    # --------------------------------------------------

    story.append(PageBreak())

    story.append(
        Paragraph(
            "🎯 Job Match Analysis",
            section_style
        )
    )

    match_score = job_data.get(
        "match_score",
        "N/A"
    )

    match_score_table = Table(
        [
            [
                Paragraph(
                    f"{safe_text(match_score)} / 100",
                    score_style
                )
            ]
        ],
        colWidths=[65 * mm],
        rowHeights=[30 * mm],
    )

    match_score_table.setStyle(
        TableStyle(
            [
                ("BOX", (0, 0), (-1, -1), 1, colors.grey),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("ALIGN", (0, 0), (-1, -1), "CENTER"),
            ]
        )
    )

    story.append(match_score_table)

    story.append(
        Paragraph(
            "<b>Matching Skills</b>",
            subheading_style
        )
    )

    story.extend(
        bullet_list(
            job_data.get("matching_skills", [])
        )
    )

    story.append(
        Paragraph(
            "<b>Missing Skills</b>",
            subheading_style
        )
    )

    story.extend(
        bullet_list(
            job_data.get("missing_skills", [])
        )
    )

    story.append(
        Paragraph(
            "<b>Resume Improvements</b>",
            subheading_style
        )
    )

    story.extend(
        bullet_list(
            job_data.get("resume_improvements", [])
        )
    )

    story.append(
        Paragraph(
            "<b>Interview Preparation</b>",
            subheading_style
        )
    )

    story.extend(
        bullet_list(
            job_data.get("interview_preparation", [])
        )
    )

    story.append(
        Paragraph(
            "<b>Learning Recommendations</b>",
            subheading_style
        )
    )

    story.extend(
        bullet_list(
            job_data.get("learning_recommendations", [])
        )
    )

    story.append(
        Paragraph(
            "<b>Final Verdict</b>",
            subheading_style
        )
    )

    story.append(
        Paragraph(
            safe_text(
                job_data.get(
                    "final_verdict",
                    "Not available."
                )
            ),
            body_style,
        )
    )

    # --------------------------------------------------
    # Footer
    # --------------------------------------------------

    def add_footer(canvas, doc):
        canvas.saveState()

        canvas.setFont("Helvetica", 8)

        canvas.drawCentredString(
            A4[0] / 2,
            10 * mm,
            f"AI Career Twin • Page {doc.page}"
        )

        canvas.restoreState()

    # --------------------------------------------------
    # Build
    # --------------------------------------------------

    doc.build(
        story,
        onFirstPage=add_footer,
        onLaterPages=add_footer,
    )

    return pdf_path