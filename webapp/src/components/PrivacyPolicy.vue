<template>
  <div class="column">
    <div class="field container">
      <h1 class="title">Privacy Policy</h1>
      <p>Joe Ipson built Media Center as an Open Source VUI app. This SERVICE is provided by Joe Ipson at no cost and is intended for use as is.</p>
      <p>This page is used to inform website visitors regarding my policies with the collection, use, and disclosure of Personal Information if anyone decided to use my Service.</p>
      <p>If you choose to use my Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that I collect is used for providing and improving the Service. I will not use or share your information with anyone except as described in this Privacy Policy.</p>
      <p>The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at Media Center unless otherwise defined in this Privacy Policy.</p>
      <h4 class="subtitle is-4" id="information-collection-and-use">Information Collection and Use</h4>
      <p>For a better experience, while using our Service, I may require you to provide us with certain personally identifiable information, including but not limited to email address, name, and the connection information for your Kodi box(es). The connection information is encrypted and save into a database for access by the Service.</p>
      <p>The app does use third party services that may collect information used to identify you.</p>
      <h4 class="subtitle is-4" id="log-data">Log Data</h4>
      <p>I want to inform you that whenever you use my Service, in a case of an error in the app I collect data and information (through third party products) called Log Data. This Log Data may include information such as your device Internet Protocol ("IP") address, device name, the time and date of your use of the Service, and other statistics.</p>
      <h4 class="subtitle is-4" id="cookies">Cookies</h4>
      <p>Cookies are files with small amount of data that is commonly used an anonymous unique identifier. These are sent to your browser from the website that you visit and are stored on your device internal memory.</p>
      <p>This Service does not use these &quot;cookies&quot; explicitly.</p>
      <h4 class="subtitle is-4" id="service-providers">Service Providers</h4>
      <p>I may work with or employ third-party individuals due to the following reasons:</p>
      <ul>
        <li>To facilitate our Service;</li>
        <li>To provide the Service on our behalf;</li>
        <li>To perform Service-related services; or</li>
        <li>To assist us in analyzing how our Service is used.</li>
      </ul>
      <p></p>
      <p>I want to inform users of this Service that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.</p>
      <h4 class="subtitle is-4" id="security">Security</h4>
      <p>I value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and I cannot guarantee its absolute security.</p>
      <h4 class="subtitle is-4" id="links-to-other-sites">Links to Other Sites</h4>
      <p>This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by me. Therefore, I strongly advise you to review the Privacy Policy of these websites. I have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</p>
      <h4 class="subtitle is-4" id="children-s-privacy">Children’s Privacy</h4>
      <p>These Services do not address anyone under the age of 13. I do not knowingly collect personally identifiable information from children under 13. In the case I discover that a child under 13 has provided me with personal information, I immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact me so that I will be able to do necessary actions.</p>
      <h4 class="subtitle is-4" id="changes-to-this-privacy-policy">Changes to This Privacy Policy</h4>
      <p>I may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. I will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately after they are posted on this page.</p>
      <h1 class="title">Terms &amp; Conditions</h1>
      <p>By using the app, these terms will automatically apply to you – you should make sure therefore that you read them carefully before using the app. You’re not allowed to copy, or modify the app, any part of the app, or our trademarks in any way. You’re not allowed to attempt to extract the source code of the app, and you also shouldn’t try to translate the app into other languages, or make derivative versions. The app itself, and all the trade marks, copyright, database rights and other intellectual property rights related to it, still belong to Joe Ipson.</p>
      <p>Joe Ipson is committed to ensuring that the app is as useful and efficient as possible. For that reason, we reserve the right to make changes to the app at any time and for any reason. We will never charge you for the app or its services.</p>
      <p>The Media Center app stores and processes personal data that you have provided to us, in order to provide my Service. However, it’s your responsibility to keep your home network secure while you use this app. We therefore recommend that you have HTTPS enabled for all of your Kodi boxes.</p>
      <p>You should be aware that there are certain things that Joe Ipson will not take responsibility for. Joe Ipson cannot take responsibility for the app not working at full functionality if you don’t have access to the internet.</p>
      <p>With respect to Joe Ipson’s responsibility for your use of the app, when you’re using the app, it’s important to bear in mind that although we endeavour to ensure that it is updated and correct at all times, we do rely on third parties to provide information to us so that we can make it available to you. Joe Ipson accepts no liability for any loss, direct or indirect, you experience as a result of relying wholly on this functionality of the app.</p>
      <p>At some point, we may wish to update the app. The app is currently available on Amazon – the requirements for this may change, and you’ll need to change your configuration if you want to keep using the app. Joe Ipson does not promise that it will always update the app so that it is relevant to you and/or works with the current version that you have enabled. However, you promise to always accept updates to the application when offered to you, We may also wish to stop providing the app, and may terminate use of it at any time without giving notice of termination to you. Unless we tell you otherwise, upon any termination, (a) the rights and licenses granted to you in these terms will end; (b) you must stop using the app, and (if needed) disable it from your account.</p>
      <h4 class="subtitle is-4" id="changes-to-this-terms-and-conditions">Changes to This Terms and Conditions</h4>
      <p>I may update our Terms and Conditions from time to time. Thus, you are advised to review this page periodically for any changes. I will notify you of any changes by posting the new Terms and Conditions on this page. These changes are effective immediately after they are posted on this page.</p>
      <h4 class="subtitle is-4" id="contact-us">Contact Us</h4>
      <p>If you have any questions or suggestions about my Terms and Conditions or Privacy Policy, do not hesitate to contact me.</p>
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
  margin-top: 15px;
}

p {
  margin-bottom: 10px;
}

.subtitle {
  margin-bottom: 10px;
}

ul {
  list-style-type: disc;
  padding-left: 20px;
  margin-bottom: 10px;
}
</style>
