import Homepage from "@/app/homepage";
import "@testing-library/jest-dom";
import { fireEvent, getByText, render, screen, waitFor } from "@testing-library/react";


describe("Character Limits on Video Name and Description", () => {
  // Test to check if the "Create Video" text is present
  it("should have a specific text", async () => {
    render(<Homepage />);
    expect(screen.getByText("Create Video")).toBeInTheDocument();
  });

  // Test to check if the form renders with correct fields
  it('renders with correct form fields', async () => {
    const { getByLabelText ,getByText} = render(<Homepage />);
    // Check if video name and description fields are present
    expect(getByLabelText('Video Name')).toBeInTheDocument();
    expect(getByLabelText('Video Description')).toBeInTheDocument();
    // Check if "Create Video" button is present
    expect(getByText('Create Video')).toBeInTheDocument();
  });

  // Test to validate video name character limit
  it('validates video name character limit', async () => {
    const { getByLabelText, getByText } = render(<Homepage />);
    const nameInput = getByLabelText('Video Name');

    // Simulate input exceeding character limit for video name
    fireEvent.change(nameInput, { target: { value: 'a'.repeat(51) } });
    fireEvent.submit(getByText('Create Video'));

    // Check if error message for exceeding character limit is displayed
    await waitFor(() => {
      expect(getByText('Video name must be at most 50 characters')).toBeInTheDocument();
    });
  });

  // Test to validate video description character limit
  it('validates video description character limit', async () => {
    const { getByLabelText, getByText } = render(<Homepage />);
    const descriptionInput = getByLabelText('Video Description');

    // Simulate input exceeding character limit for video description
    fireEvent.change(descriptionInput, { target: { value: 'a'.repeat(201) } });
    fireEvent.submit(getByText('Create Video'));

    // Check if error message for exceeding character limit is displayed
    await waitFor(() => {
      expect(getByText('Video description must be at most 200 characters')).toBeInTheDocument();
    });
  });
});

describe('Data Verification in React Hook Form', () => {
  // Test for verifying input field values
  it('Input Field Value Verification', async () => {
    render(<Homepage />);
    // Simulate user input for video name and description
    fireEvent.change(screen.getByLabelText('Video Name'), { target: { value: 'Test Name' } });
    fireEvent.change(screen.getByLabelText('Video Description'), { target: { value: 'Test Description' } });

    // Check if input values are correctly set
    expect(screen.getByLabelText('Video Name')).toHaveValue('Test Name');
    expect(screen.getByLabelText('Video Description')).toHaveValue('Test Description');
  });

  // Test for error handling
  it('Error Handling', async () => {
    render(<Homepage />);
    // Simulate submitting with empty video name
    fireEvent.change(screen.getByLabelText('Video Name'), { target: { value: '' } });
    fireEvent.click(screen.getByText('Create Video'));

    // Check if error message is displayed for required video name
    expect(screen.queryByText('Video name is required')).toBeInTheDocument();

    // Simulate filling video name and check if error message disappears
    fireEvent.change(screen.getByLabelText('Video Name'), { target: { value: 'Test Name' } });
    expect(screen.queryByText('Video name is required')).not.toBeInTheDocument();
  });

  // Test for validation on form submission
  it('Validation on Submit', async () => {
    render(<Homepage />);
    // Simulate submitting with empty fields
    fireEvent.click(screen.getByText('Create Video'));

    // Check if error message is displayed for required video name
    await waitFor(() => {
      expect(screen.getByText('Video name is required')).toBeInTheDocument();
    });

    // Simulate filling all fields and check if error message disappears
    fireEvent.change(screen.getByLabelText('Video Name'), { target: { value: 'Test Name' } });
    fireEvent.change(screen.getByLabelText('Video Description'), { target: { value: 'Test Description' } });
    fireEvent.click(screen.getByText('Create Video'));
    await waitFor(() => {
      expect(screen.queryByText('Video name is required')).not.toBeInTheDocument();
    });
  });

  // Test for form reset after submission
  it('Form Reset', () => {
    render(<Homepage />);
    // Simulate filling fields and submitting
    fireEvent.change(screen.getByLabelText('Video Name'), { target: { value: 'Test Name' } });
    fireEvent.change(screen.getByLabelText('Video Description'), { target: { value: 'Test Description' } });
    fireEvent.click(screen.getByText('Create Video'));

    // Assuming successful submission clears the form, check if fields are reset
    expect(screen.getByLabelText('Video Name')).toHaveTextContent('');
    expect(screen.getByLabelText('Video Description')).toHaveTextContent('');
    expect(screen.queryByText('Video name is required')).not.toBeInTheDocument();
  });
});

describe('Time and Size Limits of the Video', () => {
  it('displays error message for large video size', async () => {
    // Create a large video file with a size exceeding the limit
    const largeVideo = new File(["dummy content"], "large_video.mp4", { type: "video/mp4" });
    Object.defineProperty(largeVideo, 'size', { value: 100000001 });

    const { getByLabelText, getByText } = render(<Homepage />);
    const input = getByLabelText("Video Name");
    // Simulate selecting the large video file
    fireEvent.change(input, { target: { files: [largeVideo] } });
    const submitButton = getByText("Create Video");
    // Click the submit button
    fireEvent.click(submitButton);
    // Ensure that the error message for the size limit appears
    await waitFor(() => expect(getByText("Video size is too large")).toBeInTheDocument());
  });
});

describe('Form Completion Verification', () => {

  // Test for valid form submission
  it('Valid Form Submission', async () => {
    // Render the Homepage component
    render(<Homepage />);
    
    // Simulate user input for video name and description
    fireEvent.change(screen.getByLabelText('Video Name'), { target: { value: 'Test Name' } });
    fireEvent.change(screen.getByLabelText('Video Description'), { target: { value: 'Test Description' } });
    
    // Simulate button click to create video
    fireEvent.click(screen.getByText('Create Video'));

    // Wait for assertions to be fulfilled
    await waitFor(() => {
      // Ensure error messages are not present
      expect(screen.queryByText('Video name is required')).not.toBeInTheDocument();
      expect(screen.queryByText('Video description is required')).not.toBeInTheDocument();
      expect(screen.queryByText('Please upload the video')).not.toBeInTheDocument();
    });
  });

  // Test for empty form submission
  it('Empty Form Submission', async () => {
    // Render the Homepage component
    render(<Homepage />);
    
    // Simulate button click to create video without inputting any data
    fireEvent.click(screen.getByText('Create Video'));

    // Wait for assertions to be fulfilled
    await waitFor(() => {
      // Ensure error messages are present
      expect(screen.getByText('Video name is required')).toBeInTheDocument();
      expect(screen.getByText('Video description is required')).toBeInTheDocument();
      expect(screen.getByText('Please upload the video')).toBeInTheDocument();
    });
  });

  // Test for incomplete form submission
  it('Incomplete Form Submission', async () => {
    // Render the Homepage component
    render(<Homepage />);
    
    // Simulate user input for video name without description
    fireEvent.change(screen.getByLabelText('Video Name'), { target: { value: 'Test Name' } });
    
    // Simulate button click to create video
    fireEvent.click(screen.getByText('Create Video'));

    // Wait for assertions to be fulfilled
    await waitFor(() => {
      // Ensure only relevant error messages are present
      expect(screen.queryByText('Video name is required')).not.toBeInTheDocument();
      expect(screen.getByText('Video description is required')).toBeInTheDocument();
      expect(screen.getByText('Please upload the video')).toBeInTheDocument();
    });  
  });
});
