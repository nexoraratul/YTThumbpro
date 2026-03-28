import Legal from "@/components/layout/Legal";

export default function Privacy() {
  return (
    <Legal title="Privacy Policy">
      <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      
      <h2>1. Information We Collect</h2>
      <p>
        YTThumbPro ("we," "our," or "us") operates as a client-side web application. We prioritize your privacy and collect minimal information.
      </p>
      <ul>
        <li><strong>No Personal Data:</strong> We do not require you to create an account or provide personal information such as your name, email address, or phone number to use our core services.</li>
        <li><strong>Usage Data:</strong> We may use standard web analytics tools to collect anonymous usage data (such as page views, browser type, and operating system) to help us improve the site.</li>
      </ul>

      <h2>2. How We Process YouTube Links</h2>
      <p>
        When you paste a YouTube link into our tool, all processing happens entirely within your web browser. 
      </p>
      <ul>
        <li>We do not store or log the YouTube links you process.</li>
        <li>We do not keep a history of the thumbnails you download.</li>
        <li>The images are fetched directly from YouTube's public image servers to your device.</li>
      </ul>

      <h2>3. Cookies and Tracking</h2>
      <p>
        We do not use tracking cookies. We may use essential cookies or local storage to save your user preferences (like dark mode settings).
      </p>

      <h2>4. Third-Party Services</h2>
      <p>
        Since our tool fetches thumbnails from YouTube, please be aware that your browser is making a direct request to Google's servers. YouTube's own privacy policy applies to those requests.
      </p>

      <h2>5. Changes to This Policy</h2>
      <p>
        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
      </p>

      <h2>6. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us through our Contact page.
      </p>
    </Legal>
  );
}
