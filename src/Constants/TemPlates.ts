export const templates = [
  {
    id: "blank",
    label: "Blank Document",
    imageUrl: "/blank-document.svg",
    initialContent: "",
  },
  {
    id: "resume",
    label: "Resume",
    imageUrl: "/resume.svg",
    initialContent: `<div style="max-width: 800px; margin: auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif;">
    <h1 style="color: #333; text-align: center;">Resume</h1>
    
    <h2 style="color: #333;">Personal Information</h2>
    <p><strong>Name:</strong> [Your Name]</p>
    <p><strong>Email:</strong> [Your Email]</p>
    <p><strong>Phone:</strong> [Your Phone]</p>
    <p><strong>Address:</strong> [Your Address]</p>
    
    <h2 style="color: #333;">Summary</h2>
    <p>[Write a brief professional summary about yourself]</p>
    
    <h2 style="color: #333;">Work Experience</h2>
    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        <tr>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f8f8f8; text-align: left;">Company</th>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f8f8f8; text-align: left;">Role</th>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f8f8f8; text-align: left;">Years</th>
        </tr>
        <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">[Company Name]</td>
            <td style="border: 1px solid #ddd; padding: 8px;">[Job Title]</td>
            <td style="border: 1px solid #ddd; padding: 8px;">[Years]</td>
        </tr>
    </table>
    
    <h2 style="color: #333;">Education</h2>
    <p><strong>Degree:</strong> [Your Degree]</p>
    <p><strong>Institution:</strong> [Your University]</p>
    <p><strong>Year:</strong> [Year of Graduation]</p>
    
    <h2 style="color: #333;">Skills</h2>
    <ul>
        <li>[Skill 1]</li>
        <li>[Skill 2]</li>
        <li>[Skill 3]</li>
    </ul>
    
    <h2 style="color: #333;">Projects</h2>
    <p><strong>Project Name:</strong> [Project Title]</p>
    <p><strong>Description:</strong> [Brief description of the project]</p>
    
    <h2 style="color: #333;">Certifications</h2>
    <p>[Certification Name] - [Issuing Organization]</p>
    
    <h2 style="color: #333;">References</h2>
    <p>[Available upon request]</p>
</div>
`,
  },
  {
    id: "business-letter",
    label: "Business Letter",
    imageUrl: "/business-letter.svg",
    initialContent: `<div style="max-width: 800px; margin: auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif;">
    <h1 style="color: #333; text-align: center;">Business Letter</h1>
    
    <p style="color: #333;">[Your Name]</p>
    <p style="color: #333;">[Your Position]</p>
    <p style="color: #333;">[Your Company Name]</p>
    <p style="color: #333;">[Company Address]</p>
    <p style="color: #333;">[City, State, ZIP Code]</p>
    <p style="color: #333;">[Email Address]</p>
    <p style="color: #333;">[Phone Number]</p>
    <p style="color: #333;">[Date]</p>

    <p style="color: #333;">[Recipient's Name]</p>
    <p style="color: #333;">[Recipient's Position]</p>
    <p style="color: #333;">[Recipient's Company Name]</p>
    <p style="color: #333;">[Recipient's Company Address]</p>
    <p style="color: #333;">[City, State, ZIP Code]</p>

    <h2 style="color: #333;">Dear [Recipient's Name],</h2>
    
    <p>I am writing to [state the purpose of the letter, e.g., "express interest in a business collaboration," "follow up on a meeting," or "present a proposal"]. Our company, [Your Company Name], specializes in [briefly describe your business], and we believe there is a great opportunity to work together.</p>
    
    <p>We have reviewed [mention any relevant details about the recipient’s company, project, or proposal], and we are confident that our expertise in [mention relevant skills or services] can contribute positively to your goals.</p>
    
    <p>I would appreciate the opportunity to discuss this further at your convenience. Please let me know a suitable time for a meeting or call. I look forward to your response and hope to establish a strong professional relationship.</p>
    
    <p>Sincerely,</p>
    <p>[Your Name]</p>
    <p>[Your Position]</p>
    <p>[Your Company Name]</p>
</div>
`,
  },
  {
    id: "project-proposal",
    label: "Project Proposal",
    imageUrl: "/project-proposal.svg",
    initialContent: `
    <div style="max-width: 800px; margin: auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif;">
    <h1 style="color: #333;">Project Proposal Template</h1>
    <h2 style="color: #333;">1. Project Title</h2>
    <p>[Enter the project title]</p>

    <h2 style="color: #333;">2. Project Overview</h2>
    <p>Provide a brief summary of the project, including its purpose and objectives.</p>

    <h2 style="color: #333;">3. Background and Justification</h2>
    <p>Describe the background of the project and its relevance.</p>

    <h2 style="color: #333;">4. Objectives</h2>
    <ul>
        <li>Objective 1</li>
        <li>Objective 2</li>
        <li>Objective 3</li>
    </ul>

    <h2 style="color: #333;">5. Scope of Work</h2>
    <p>Define the scope, deliverables, and expected outcomes.</p>

    <h2 style="color: #333;">6. Methodology</h2>
    <p>Explain the approach and techniques used.</p>

    <h2 style="color: #333;">7. Project Timeline</h2>
    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        <tr>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f8f8f8; text-align: left;">Milestone</th>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f8f8f8; text-align: left;">Description</th>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f8f8f8; text-align: left;">Deadline</th>
        </tr>
        <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">Phase 1</td>
            <td style="border: 1px solid #ddd; padding: 8px;">[Description]</td>
            <td style="border: 1px solid #ddd; padding: 8px;">[Date]</td>
        </tr>
    </table>

    <h2 style="color: #333;">8. Budget and Resources</h2>
    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        <tr>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f8f8f8; text-align: left;">Item</th>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f8f8f8; text-align: left;">Cost</th>
        </tr>
        <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">[Item 1]</td>
            <td style="border: 1px solid #ddd; padding: 8px;">[Cost]</td>
        </tr>
    </table>

    <h2 style="color: #333;">9. Team and Responsibilities</h2>
    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        <tr>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f8f8f8; text-align: left;">Name</th>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f8f8f8; text-align: left;">Role</th>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f8f8f8; text-align: left;">Responsibilities</th>
        </tr>
        <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">[Person 1]</td>
            <td style="border: 1px solid #ddd; padding: 8px;">[Role]</td>
            <td style="border: 1px solid #ddd; padding: 8px;">[Duties]</td>
        </tr>
    </table>

    <h2 style="color: #333;">10. Risk Assessment and Mitigation</h2>
    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        <tr>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f8f8f8; text-align: left;">Risk</th>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f8f8f8; text-align: left;">Probability</th>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f8f8f8; text-align: left;">Impact</th>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f8f8f8; text-align: left;">Mitigation Plan</th>
        </tr>
        <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">[Risk 1]</td>
            <td style="border: 1px solid #ddd; padding: 8px;">[Low/Medium/High]</td>
            <td style="border: 1px solid #ddd; padding: 8px;">[Low/Medium/High]</td>
            <td style="border: 1px solid #ddd; padding: 8px;">[Plan]</td>
        </tr>
    </table>

    <h2 style="color: #333;">11. Evaluation and Success Metrics</h2>
    <p>Define key performance indicators (KPIs) and success criteria.</p>

    <h2 style="color: #333;">12. Conclusion</h2>
    <p>Summarize the proposal, emphasizing the importance of the project.</p>
</div>

    `,
  },
  {
    id: "software-proposal",
    label: "Software Proposal",
    imageUrl: "/software-proposal.svg",
    initialContent: `<div style="max-width: 800px; margin: auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif;">
    <h1 style="color: #333; text-align: center;">Software Proposal</h1>
    
    <h2 style="color: #333;">1. Project Title</h2>
    <p>[Enter the software project title]</p>

    <h2 style="color: #333;">2. Project Overview</h2>
    <p>Provide a brief summary of the software, including its purpose and objectives.</p>

    <h2 style="color: #333;">3. Problem Statement</h2>
    <p>Describe the problem that the software aims to solve and why it is important.</p>

    <h2 style="color: #333;">4. Proposed Solution</h2>
    <p>Explain how the software will address the problem, highlighting key features and functionalities.</p>

    <h2 style="color: #333;">5. Technology Stack</h2>
    <ul>
        <li>Frontend: [e.g., React, Vue, Angular]</li>
        <li>Backend: [e.g., Node.js, Django, Spring Boot]</li>
        <li>Database: [e.g., PostgreSQL, MongoDB, MySQL]</li>
        <li>Other Tools: [e.g., Docker, Kubernetes, Firebase]</li>
    </ul>

    <h2 style="color: #333;">6. Development Timeline</h2>
    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        <tr>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f8f8f8; text-align: left;">Phase</th>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f8f8f8; text-align: left;">Description</th>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f8f8f8; text-align: left;">Duration</th>
        </tr>
        <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">Planning</td>
            <td style="border: 1px solid #ddd; padding: 8px;">Requirement analysis and research</td>
            <td style="border: 1px solid #ddd; padding: 8px;">[Weeks]</td>
        </tr>
    </table>

    <h2 style="color: #333;">7. Budget and Cost Estimation</h2>
    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        <tr>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f8f8f8; text-align: left;">Item</th>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f8f8f8; text-align: left;">Estimated Cost</th>
        </tr>
        <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">Development</td>
            <td style="border: 1px solid #ddd; padding: 8px;">[Cost]</td>
        </tr>
    </table>

    <h2 style="color: #333;">8. Team Members</h2>
    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        <tr>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f8f8f8; text-align: left;">Name</th>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f8f8f8; text-align: left;">Role</th>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f8f8f8; text-align: left;">Responsibilities</th>
        </tr>
        <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">[Person 1]</td>
            <td style="border: 1px solid #ddd; padding: 8px;">[Role]</td>
            <td style="border: 1px solid #ddd; padding: 8px;">[Duties]</td>
        </tr>
    </table>

    <h2 style="color: #333;">9. Risk Assessment</h2>
    <p>Identify potential risks and mitigation strategies.</p>

    <h2 style="color: #333;">10. Conclusion</h2>
    <p>Summarize the proposal and emphasize the impact of the software.</p>
</div>
`,
  },
  {
    id: "letter",
    label: "Letter",
    imageUrl: "/letter.svg",
    initialContent: `<div style="max-width: 800px; margin: auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif;">
    <h1 style="color: #333; text-align: center;">Casual Letter</h1>
    
    <p style="color: #333;">[Your Name]</p>
    <p style="color: #333;">[Your Address]</p>
    <p style="color: #333;">[City, State, ZIP Code]</p>
    <p style="color: #333;">[Date]</p>

    <p style="color: #333;">Dear [Friend's Name],</p>
    
    <p>Hey [Friend's Name]! I hope you're doing well. It's been a while since we last caught up, and I just wanted to check in and see how things are going with you.</p>
    
    <p>Things on my end have been [brief update about your life, e.g., "pretty busy with work/school" or "exciting because I just started a new hobby"]. I was actually thinking about our last [shared memory or event], and it made me realize how much I miss hanging out with you.</p>
    
    <p>Let's plan something soon! Maybe we could [suggest an activity, e.g., "grab some coffee," "watch a movie," or "go on a trip"]. Let me know when you're free so we can make it happen.</p>
    
    <p>Take care and talk soon!</p>
    
    <p>Best,</p>
    <p>[Your Name]</p>
</div>
`,
  },
  {
    id: "cover-letter",
    label: "Cover Letter",
    imageUrl: "/cover-letter.svg",
    initialContent: `<div style="max-width: 800px; margin: auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif;">
    <h1 style="color: #333; text-align: center;">Cover Letter</h1>
    
    <p style="color: #333;">[Your Name]</p>
    <p style="color: #333;">[Your Address]</p>
    <p style="color: #333;">[City, State, ZIP Code]</p>
    <p style="color: #333;">[Your Email]</p>
    <p style="color: #333;">[Your Phone Number]</p>
    <p style="color: #333;">[Date]</p>

    <p style="color: #333;">[Hiring Manager's Name]</p>
    <p style="color: #333;">[Company Name]</p>
    <p style="color: #333;">[Company Address]</p>
    <p style="color: #333;">[City, State, ZIP Code]</p>

    <h2 style="color: #333;">Dear [Hiring Manager's Name],</h2>
    
    <p>I am excited to apply for the [Job Title] position at [Company Name]. With my background in [Your Field/Industry] and experience in [Relevant Skills or Previous Jobs], I am confident that my skills align with the goals of your team.</p>
    
    <p>In my previous role at [Previous Company Name], I [mention a key achievement or responsibility]. This experience has strengthened my ability to [mention a key skill relevant to the job]. I am particularly passionate about [mention a relevant industry aspect or company value], and I believe my expertise in [specific skill] would be a great asset to your company.</p>
    
    <p>I am eager to contribute my skills and dedication to [Company Name] and would welcome the opportunity to discuss my qualifications further. Please find my resume attached for your review. I look forward to your response.</p>
    
    <p>Sincerely,</p>
    <p>[Your Name]</p>
</div>
`,
  },
];
