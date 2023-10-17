import { TeacherResume, TeacherResumeCourse, TeacherResumeResearch } from "@model/response-data.model";
import { Document, IIndentAttributesProperties, ISectionOptions, LevelFormat, Paragraph, ParagraphChild, SectionType, TextRun, convertInchesToTwip } from "docx";
import { FileChild } from "docx/build/file/file-child";

const bulletIndent: (level: number) => IIndentAttributesProperties = 
  (level: number) => ({ left: convertInchesToTwip(level == 0 ? 0.5 : 0.5+0.25*level), hanging: convertInchesToTwip(0.25) })


export const teacherResumeTemplate = (resumes: TeacherResume[], debug: boolean = false) => new Document({
  creator: "NTUST SOM - KaiYi Chang",
  title: "Sample Document",
  description: "profile",
  styles: {
    default: {
      document: {
        run: { font: "Calibri", size: 24 },
        paragraph: { spacing: { before: 180, after: 180 }, indent: bulletIndent(0) } // 行距
      } 
    }
  },
  numbering: {
    config: [{
      reference: "alphabetNumbering",
      levels: [{
        level: 0,
        format: LevelFormat.BULLET,
        text: "．",
        style: {
          paragraph: { indent: bulletIndent(0) }
        }
      }, {
        level: 1,
        format: LevelFormat.BULLET,
        text: "*",
        style: {
          paragraph: { indent: bulletIndent(1) }
        }
      }],
    }]
  },
  sections: [...generateTeacherPage(resumes, debug)]
});

const generateTeacherPage = (resumes: TeacherResume[], debug: boolean): ISectionOptions[] => {
  return resumes.map(resume => ({
    properties: {
      type: SectionType.NEXT_PAGE,
    },
    children: [
      ...generateTeacherInfo(resume),
      new Paragraph({}),
      ...generateCourse(resume.course),
      ...generateResearch(resume.research, debug),
    ],
  } as ISectionOptions));
}

const generateTeacherInfo = (resume: TeacherResume): FileChild[] => {
  if(!resume) return [];
  return [
    new Paragraph({
      text: `English Name：${resume.englishName || ''}`,
      bullet: { level: 0 },
    }),
    new Paragraph({
      text: `Chinese Name：${resume.name || ''}`,
      bullet: { level: 0 },
    }),
    new Paragraph({
      text: `Highest Degree Obtained Year：${resume.degreeYear || ''}`,
      bullet: { level: 0 },
    }),
    new Paragraph({
      text: `Highest Degree Title：${resume.degree || ''}`,
      bullet: { level: 0 },
    }),
    new Paragraph({
      text: `Department：${resume.department || ''}`,
      bullet: { level: 0 },
    }),
    new Paragraph({
      text: `Brief Description of Basis for Qualification：${generateQualificationDescription(resume.qualification) || ''}`,
      bullet: { level: 0 },
    }),
  ];
};

const generateCourse = (course: TeacherResumeCourse[]): FileChild[] => {
  if (course.length == 0) return [];

  return [
    new Paragraph({
      text: "Courses Taught (2022-23)：",
      numbering: { reference: "alphabetNumbering", level: 0 }
    }),
    ...course.map(c => (new Paragraph({
      text: `(${c.semester}) ${c.name} (${c.englishName}; ${c.code})`,
      numbering: { reference: "alphabetNumbering", level: 1 },
    })))
  ];
}

const generateResearch = (research: TeacherResumeResearch[], debug: boolean): FileChild[] => {
  if (research.length == 0) return [];

  const r = research.filter(r => {
    if (!r.researchTypeCode) return true; // preserve old data
    return !r.researchTypeCode.match(/乙|丙|庚/g); // filter out 國科會、產學合作、教育部教學實踐研究計畫
  });

  const researchList: FileChild[] = [];
  researchList.push(new Paragraph({
      text: "Publications (2018-23)：",
      numbering: { reference: "alphabetNumbering", level: 0 },
    }));
  researchList.push(...r.map(r => (new Paragraph({
      numbering: { reference: "alphabetNumbering", level: 1 },
      children: generateResearchItem(r, debug)
    }))));
  return researchList;
}

const generateResearchItem = (research: TeacherResumeResearch, debug: boolean): ParagraphChild[] => {
  const children: ParagraphChild[] = [];

  if(research.researchTypeCode && debug) {
    children.push(new TextRun({
      text: `[${research.researchTypeCode}] `,
      color: "969696",
    }));
  }

  if (research.authors) {
    children.push(new TextRun({
      text: `${research.authors} `,
    }));
  }

  if (research.year) {
    children.push(new TextRun({
      text: `(${research.year}). `,
    }));
  } else {
    children.push(new TextRun({
      text: `(n.d.). `,
    }));
  }

  children.push(new TextRun({
    text: `${research.title}. `,
  }));
  if (research.appearedIn) {
    children.push(new TextRun({
      text: `${research.appearedIn}`,
      italics: true,
    }));
  }


  if (research.volume) {
    children.push(new TextRun({
      text: `${!!research.appearedIn ? ', ' : ' '}${research.volume}`,
    }));
  } else {
    children.push(new TextRun({
      text: `. `,
    }));
  }

  if (research.issue) {
    children.push(new TextRun({
      text: `(${research.issue})`,
    }));
  }

  if (research.page) {
    children.push(new TextRun({
      text: `:${research.page}`,
    }));
  }

  if (research.class) {
    children.push(new TextRun({
      text: ` [${research.class}]`,
    }));
  }
  return children;
}


const generateQualificationDescription = (qualification: null | 'SA' | 'SP' | 'IP' | 'PA' | 'A'): string => {
  switch (qualification) {
    case 'SA':
      return "SA: Meets or Exceeds 3 PRJs";
    case 'SP':
      return "SP: Meets or Exceeds 2 Academic Researches";
    case 'IP':
      return "IP: Meets or Exceeds 2 Professional Activities";
    case 'PA':
      return "PA: Meets or Exceeds 3 RPs";
    case 'A':
      return "A: Additional";
    default:
      return "";
  }
}