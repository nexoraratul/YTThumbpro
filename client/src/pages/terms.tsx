import Legal from "@/components/layout/Legal";

export default function Terms() {
  return (
    <Legal title="Terms of Service">
      <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      
      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing and using YTThumbPro, you accept and agree to be bound by the terms and provision of this agreement.
      </p>

      <h2>2. Description of Service</h2>
      <p>
        YTThumbPro provides a web-based tool that allows users to extract and download thumbnail images from publicly available YouTube videos. The service is provided "as is" and "as available."
      </p>

      <h2>3. Copyright and Intellectual Property</h2>
      <p>
        <strong>Important:</strong> We do not own the thumbnails you download. The intellectual property rights of all thumbnails belong to their respective creators or to YouTube (Google LLC). 
      </p>
      <ul>
        <li>You are responsible for ensuring you have the right to use the downloaded images.</li>
        <li>We do not grant you any license or rights to the downloaded material.</li>
        <li>Do not use downloaded thumbnails for commercial purposes without explicit permission from the copyright holder.</li>
      </ul>

      <h2>4. Acceptable Use</h2>
      <p>
        You agree not to use the service:
      </p>
      <ul>
        <li>For any unlawful purpose.</li>
        <li>To download content that you are not authorized to access.</li>
        <li>In any way that could damage, disable, overburden, or impair our servers or networks.</li>
      </ul>

      <h2>5. Disclaimer of Warranties</h2>
      <p>
        YTThumbPro is an independent tool and is not affiliated with, authorized, maintained, sponsored, or endorsed by YouTube or Google. We do not guarantee that the service will always be error-free or uninterrupted.
      </p>

      <h2>6. Limitation of Liability</h2>
      <p>
        In no event shall YTThumbPro be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our services.
      </p>

      <h2>7. Changes to Terms</h2>
      <p>
        We reserve the right to modify these terms at any time. Your continued use of the service following any such modification constitutes your agreement to follow and be bound by the modified terms.
      </p>
    </Legal>
  );
}
