This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# Instructions for Testing the Video Creation Component

This document provides detailed instructions for QA to perform testing on the video creation component. The component should be tested against the following requirements:

1. **Character Limits on Video Name and Description**: The video name and description should have defined character limits. The test should verify if these limits are being applied correctly.

2. **Time and Size Limits of the Video**: The component should include validations for the time and size of the video. The test should ensure that these validations are working correctly.

3. **Data Verification in React Hook Form**: The test should ensure that all data entered in the form is correctly managed by React Hook Form.

4. **Form Completion Verification**: Upon clicking "Submit" (or equivalent), the test should verify if all mandatory fields are filled before allowing the form submission.

## Steps for Test Execution

1. **Environment Setup**:
   - Clone this repository to your local machine.
   - Ensure that Node.js and npm are installed on your system.

2. **Dependency Installation**:
   - In the root directory of the project, run the command `npm install` to install all necessary dependencies.

3. **Running Tests**:
   - Open the terminal in the root directory of the project.
   - Run the command `npm run test` to start end-to-end tests with Cypress.

4. **Analyzing Results**:
   - After the tests are completed, review the results to ensure that all functionalities are working as expected.
   - Verify that all requirements have been tested and there are no failures or errors in the tests.

## Important Notes

- Ensure to thoroughly review and understand the requirements of the video creation component before executing the tests.
- If necessary, refer to the documentation and source code files of the project for additional information on the implementation of the component.
- If you encounter any issues during testing or have any questions, feel free to reach out to the development team for further support.
