<template>
  <div class="column">
    <div class="field container">
      <h3 class="title">Privacy Policy</h3>
      <div class="control">
        <p>This Privacy Policy governs the manner in which Media Center collects, uses, maintains and discloses information collected from users (each, a "User") of the https://media-center.io website ("Site").</p>
        <br>
        <h4>Personal identification information</h4>
        <p>We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, register on the site, and in connection with other activities, services, features or resources we make available on our Site. Users may be asked for, as appropriate, name, email address. We will collect personal identification information from Users only if they voluntarily submit such information to us. Users can always refuse to supply personally identification information, except that it may prevent them from engaging in certain Site related activities.</p>
        <br>
        <h4>Non-personal identification information</h4>
        <p>We may collect non-personal identification information about Users whenever they interact with our Site. Non-personal identification information may include the browser name, the type of computer and technical information about Users means of connection to our Site, such as the operating system and the Internet service providers utilized and other similar information.</p>
        <br>
        <h4>Web browser cookies</h4>
        <p>Our Site may use "cookies" to enhance User experience. User's web browser places cookies on their hard drive for record-keeping purposes and sometimes to track information about them. User may choose to set their web browser to refuse cookies, or to alert you when cookies are being sent. If they do so, note that some parts of the Site may not function properly.</p>
        <br>
        <h4>How we use collected information</h4>
        <p>Media Center may collect and use Users personal information for the following purposes:</p>
        <ul>
          <li>
            <i>To run and operate our Site</i><br/>
            We may need your information display content on the Site correctly.
          </li>
          <li>
            <i>To personalize user experience</i><br/>
            We may use information in the aggregate to understand how our Users as a group use the services and resources provided on our Site.
          </li>
        </ul>
        <br>
        <h4>How we protect your information</h4>
        <p>We adopt appropriate data collection, storage and processing practices and security measures to protect against unauthorized access, alteration, disclosure or destruction of your personal information, username, password, transaction information and data stored on our Site.</p>
        <br>
        <h4>Sharing your personal information</h4>
        <p>We do not sell, trade, or rent Users personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates and advertisers for the purposes outlined above. </p>
        <br>
        <h4>Third party websites</h4>
        <p>Users may find advertising or other content on our Site that link to the sites and services of our partners, suppliers, advertisers, sponsors, licensors and other third parties. We do not control the content or links that appear on these sites and are not responsible for the practices employed by websites linked to or from our Site. In addition, these sites or services, including their content and links, may be constantly changing. These sites and services may have their own privacy policies and customer service policies. Browsing and interaction on any other website, including websites which have a link to our Site, is subject to that website's own terms and policies.</p>
        <br>
        <h4>Compliance with children's online privacy protection act</h4>
        <p>Protecting the privacy of the very young is especially important. For that reason, we never collect or maintain information at our Site from those we actually know are under 13, and no part of our website is structured to attract anyone under 13.</p>
        <br>
        <h4>Changes to this privacy policy</h4>
        <p>Media Center has the discretion to update this privacy policy at any time. When we do, we will post a notification on the main page of our Site. We encourage Users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect. You acknowledge and agree that it is your responsibility to review this privacy policy periodically and become aware of modifications.</p>
        <br>
        <h4>Your acceptance of these terms</h4>
        <p>By using this Site, you signify your acceptance of this policy. If you do not agree to this policy, please do not use our Site. Your continued use of the Site following the posting of changes to this policy will be deemed your acceptance of those changes. This privacy policy was built <a href="https://privacypolicies.com/" target="_blank">using the generator at https://PrivacyPolicies.com</a>.</p>
        <br>
        <h4>Contacting us</h4>
        <p>If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us.</p>
        <br>
        <p>This document was last updated on November 23, 2017</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'privacy-policy',
})
export default class PrivacyPolicy extends Vue {
  public metaInfo(): any {
    return {
      title: 'Privacy Policy'
    }
  }
}
</script>

<style scoped>
.title {
  font-size: 25px;
  font-weight: 600;
  margin-top: 15px;
}
</style>
