import { JSX } from 'react'
import styles from './UserAgreement.module.css'
import MyButton from '../myButton/MyButton';

function UserAgreement():JSX.Element {
    return (
        <div className={styles.UserAgreementContainer}>
          <h1>User Agreement</h1>
    
          <section>
            <h2>1. Introduction</h2>
            <p>
              This User Agreement ("Agreement") governs your access to and use of our services,
              including our website, applications, and any related content (collectively, the "Service").
              By using the Service, you acknowledge that you have read, understood, and agree to be bound
              by this Agreement. If you do not agree, you may not use the Service.
            </p>
            <p>
              We reserve the right to update or modify this Agreement at any time without prior notice. Continued use
              of the Service after changes will constitute your acceptance of the updated Agreement.
            </p>
          </section>
    
          <section>
            <h2>2. Eligibility</h2>
            <p>
              To use the Service, you must be at least 18 years old or have the consent of a legal guardian.
              By using our Service, you confirm that you meet these requirements and are not prohibited from using
              the platform by any applicable laws.
            </p>
          </section>
    
          <section>
            <h2>3. User Responsibilities</h2>
            <p>
              You are responsible for maintaining the confidentiality of your login credentials and for all activities
              that occur under your account. You agree to immediately notify us of any unauthorized use of your account
              or any other breach of security.
            </p>
            <p>
              You agree not to:
            </p>
            <ul>
              <li>Use the Service for any unlawful purposes;</li>
              <li>Distribute malware or harmful code;</li>
              <li>Harvest data or information from other users;</li>
              <li>Impersonate any person or entity, or misrepresent your affiliation with a person or entity.</li>
            </ul>
          </section>
    
          <section>
            <h2>4. Intellectual Property</h2>
            <p>
              All materials on the Service, including design, text, graphics, logos, images, and software,
              are the intellectual property of our company or our licensors. You may not reproduce, distribute,
              or create derivative works without our express written permission.
            </p>
          </section>
    
          <section>
            <h2>5. Payments and Subscriptions</h2>
            <p>
              If you purchase any paid features or subscriptions, you agree to pay all applicable fees. Subscriptions
              will auto-renew unless canceled before the end of the billing cycle. We do not provide refunds for partial periods.
            </p>
          </section>
    
          <section>
            <h2>6. Privacy</h2>
            <p>
              Our use of your personal information is governed by our Privacy Policy. By using the Service,
              you consent to our collection and use of your data in accordance with that policy.
            </p>
          </section>
    
          <section>
            <h2>7. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your account if we believe you have violated
              this Agreement or are engaged in any harmful activity. Upon termination, your right to use
              the Service will immediately cease.
            </p>
          </section>
    
          <section>
            <h2>8. Limitation of Liability</h2>
            <p>
              We are not liable for any direct, indirect, incidental, special, or consequential damages resulting
              from your use of the Service. The Service is provided "as is" without warranties of any kind.
            </p>
          </section>
    
          <section>
            <h2>9. Contact Information</h2>
            <p>
              If you have any questions about this User Agreement, please contact us at:{" "}
              <a href="mailto:admin@willbeedone.com">support@yourapp.com</a>
            </p>
          </section>
    
          <p className={styles.lastUpdated}><em>Last updated: April 4, 2025</em></p>

          <MyButton
              type="button"
              text="Go Back"
              to="/sign-up-form"
              data-testid="MyButtonGoBack_HndgFtd"
            />
        </div>
        
      );
    };
    
    export default UserAgreement;