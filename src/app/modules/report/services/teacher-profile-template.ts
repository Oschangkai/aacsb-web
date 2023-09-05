import { TeacherResume, TeacherResumeCourse, TeacherResumeResearch } from "@model/response-data.model";
import { Document, IIndentAttributesProperties, ISectionOptions, LevelFormat, Paragraph, SectionType, convertInchesToTwip } from "docx";
import { FileChild } from "docx/build/file/file-child";

const bulletIndent: (level: number) => IIndentAttributesProperties = 
  (level: number) => ({ left: convertInchesToTwip(level == 0 ? 0.5 : 0.5+0.25*level), hanging: convertInchesToTwip(0.25) })


export const teacherResumeTemplate = (resumes: TeacherResume[]) => new Document({
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
        text: "\u2023",
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
  sections: [...generateTeacherPage(resumes)]
});

const generateTeacherPage = (resumes: TeacherResume[]): ISectionOptions[] => {
  return resumes.map(resume => ({
    properties: {
      type: SectionType.NEXT_PAGE,
    },
    children: [
      ...generateTeacherInfo(resume),
      new Paragraph({}),
      ...generateCourse(resume.course),
      ...generateResearch(resume.research),
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
      text: "Courses Taught (2023)：",
      numbering: { reference: "alphabetNumbering", level: 0 }
    }),
    ...course.map(c => (new Paragraph({
      text: `(${c.semester}) ${c.name} (${c.englishName}; ${c.code})`,
      numbering: { reference: "alphabetNumbering", level: 1 },
    })))
  ];
}

const generateResearch = (research: TeacherResumeResearch[]): FileChild[] => {
  if (research.length == 0) return [];
  const journal1 = research.filter(r => r.type == 'Journal 1');
  const journal2 = research.filter(r => r.type == 'Journal 2');
  const others = research.filter(r => r.type == 'Others');

  const researchList: FileChild[] = [];
  if (journal1.length > 0) {
    researchList.push(new Paragraph({
      text: "Research Publication (Journals)：",
      numbering: { reference: "alphabetNumbering", level: 0 },
    }));
    researchList.push(...journal1.map(r => (new Paragraph({
      text: r.value,
      numbering: { reference: "alphabetNumbering", level: 1 },
    }))));
  }
  if (journal2.length > 0) {
    researchList.push(new Paragraph({
      text: "Peer Reviewed Proceedings：",
      numbering: { reference: "alphabetNumbering", level: 0 },
    }));
    researchList.push(...journal2.map(r => (new Paragraph({
      text: r.value,
      numbering: { reference: "alphabetNumbering", level: 1 },
    }))));
  }
  if (others.length > 0) {
    researchList.push(new Paragraph({
      text: "Conference Presentations：",
      numbering: { reference: "alphabetNumbering", level: 0 },
    }));
    researchList.push(...others.map(r => (new Paragraph({
      text: r.value,
      numbering: { reference: "alphabetNumbering", level: 1 },
    }))));
  }
  return researchList;
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
      return "A: Additional Qualification";
    default:
      return "";
  }
}