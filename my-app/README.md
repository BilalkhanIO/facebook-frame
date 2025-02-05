/*
Project: Modern Profile Frame App
Technology: Next.js (App Router), Tailwind CSS, React Hooks, html2canvas, react-easy-crop

Overview:
-------------
We are building a modern web application that allows users to:
1. Upload an image (profile picture) and crop/resize it.
2. Select a frame from a predefined set of frames stored in public/frames.
3. Overlay the chosen frame on top of the cropped image.
4. Customize additional visual elements (such as a background color or text overlay).
5. Download the final, combined image using html2canvas.
6. Optionally, share the final image on social media.
7. No authentication is required.

Requirements & Additional Features:
-------------
1. **Modern Home Page:**
   - Use a modern, responsive UI with a hero section, a navigation bar (if needed), and a content area.
   - Include subtle animations (using Tailwind CSS transitions or libraries like Framer Motion) for elements as they appear.
   - Use a clean color palette and spacing that works on both mobile and desktop.

2. **Image Upload & Crop:**
   - Create an ImageUploader component that allows users to select an image.
   - Use FileReader to convert the file to a Data URL.
   - Integrate react-easy-crop to allow users to crop, move, and zoom the image.
   - When cropping is complete, pass the image data (and crop coordinates if needed) to the parent component.

3. **Frame Selection:**
   - Create a FrameSelector component.
   - Display a set of pre-made frames from the public/frames folder (e.g., frame1.png, frame2.png, etc.).
   - Let users select a frame with a clear highlight on the selected frame.
   - Consider adding an option for users to upload their own custom frame.

4. **Preview & Overlay:**
   - Combine the cropped image and the selected frame using absolute positioning.
   - Allow users to preview the result in a dedicated area with smooth transitions.
   - Additional customization: Optionally add text or a colored background behind the image.

5. **Download & Share:**
   - Use html2canvas to capture the preview element and generate a downloadable PNG.
   - Provide a download button with a modern look.
   - Optionally, add social sharing buttons (e.g., for Twitter, Facebook, etc.) that trigger sharing of the generated image.

6. **Styling & Responsiveness:**
   - Use Tailwind CSS to style all components.
   - Ensure the UI is modern with proper spacing, typography, and a responsive layout.
   - Consider a gradient background for the hero section and a clean card layout for the main content.
   - Add hover effects and transitions on buttons and images.

Project Structure:
-------------
- /app/page.js: The main modern home page that integrates the components.
- /components/ImageUploader.js: Handles image upload and cropping.
- /components/FrameSelector.js: Displays available frames and handles selection.
- /public/frames/: Place your transparent PNG frames here.
- /components/Navbar.js (optional): A modern navigation bar for additional navigation or branding.

Installation Steps:
-------------
1. **Initialize the Next.js project:**
   ```bash
   npx create-next-app@latest modern-profile-frame-app
   cd modern-profile-frame-app
