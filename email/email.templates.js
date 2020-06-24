const { CLIENT_ORIGIN } = require('../configs/email')

// This file is exporting an Object with a single key/value pair.
// However, because this is not a part of the logic of the application
// it makes sense to abstract it to another file. Plus, it is now easily 
// extensible if the application needs to send different email templates
// (eg. unsubscribe) in the future.
module.exports = {

  confirm: id => ({
    subject: 'Spotbox - verify your email address',
    html: `


		<table width="600" border="0" cellspacing="0" cellpadding="0" align="center" class="wrapper-section-one" style="background: #303030;" bgcolor="#303030">
    <tbody><tr>
      <td>
      <table cellspacing="0" cellpadding="0" border="0" width="100%">
        <tbody><tr>
          <td width="24"><img src="../client/src/components/Home/icons/blue.png" width="200" height="200" alt=""></td>
          <td>
          <table cellspacing="0" cellpadding="0" border="0" width="100%">
            <tbody><tr>
              <td height="55"><img src="../client/src/components/Home/icons/myposts.jpg" width="1" height="1" alt=""></td>
            </tr>
            <tr>
              <td class="heading-editable edit-text" style="font-size: 36px; color: #f07c11; text-align: center; font-family: Raleway, Arial, Helvetica, sans-serif; font-weight: 700; text-transform: uppercase; outline: none; outline-offset: 1px; position: relative;" data-selector=".heading-editable" contenteditable="false" spellcheck="false"> Welcome to SPOTBOX </td>
            </tr>
            <tr>
              <td class="heading-editable edit-text" style="font-size: 23px; color: rgb(206, 206, 206); text-align: center; font-weight: 500; line-height: 1.7; outline: none; outline-offset: 1px; position: relative;" data-selector=".heading-editable" contenteditable="false" spellcheck="false"> This is an automatically generated e-mail Confirmation. Please take some seconds to read our cookie policy and then confirm your E-Mail-address. </td>
            </tr>
            <tr>
              <td height="25"><img src="images/blank.gif" width="1" height="1" alt=""></td>
            </tr>
            <tr>
              <td class="editable edit-text" style="font-size: 12px; line-height: 1.2; color: rgb(206, 206, 206); text-align: center; font-family: Raleway, Arial, Helvetica, sans-serif; outline: none; outline-offset: 1px; position: relative;" data-selector="td.editable" contenteditable="false" spellcheck="false"> SPOTBOX.ORG uses cookies to personalize or enhance your user experience. A cookie is a small text file that is placed on your hard disk by a Web page server. Cookies cannot be used to run programs or deliver viruses to your computer. Cookies are uniquely assigned to you, and can only be read by a Web Server in the domain that issued the cookie to you. One of the primary purposes of cookies is to provide a convenience feature to save you time. For example, if you personalize a web page, or navigate within a site, a cookie helps the site to recall your specific information on subsequent visits. Hence, this simplifies the process of delivering relevant content and eases site navigation by providing and saving your preferences and login information as well as providing personalized functionality. You have the ability to accept or decline cookies. Most Web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies. If you reject cookies by changing your browser settings then be aware that this may disable some of the functionality on our Website. </td>
            </tr>
            <tr>
              <td height="32"><img src="../client/src/components/Home/icons/spotbox-logo.svg" width="1" height="1" alt=""></td>
            </tr>
            <tr>
                  <td>
                  <table cellpadding="0" cellspacing="0" border="0" width="128" style="background:#ededed;" align="center">
                    <tbody><tr>

                      <td height="30" width="128" style="text-align: center;"><a href="${CLIENT_ORIGIN}/confirm/${id}" class="editable " style="font-size:13px; font-family: 'Raleway',Arial,Helvetica,sans-serif;font-weight: 500;  text-align:center;text-transform:uppercase; color:#f07c11; text-decoration: none; width: 328px; height: 38px;  display:block; vertical-align: middle; line-height: 40px;" data-selector="a.editable"> Clicke here to confirm your E-mail </a></td>
                    </tr>

                  </tbody></table>
                </td>

                </tr>
            <tr>
              <td height="42"><img src="imagesblank.gif" width="1" height="1" alt=""></td>
            </tr>
  
           
            <tr>
              <td align="center">
              <table cellspacing="0" cellpadding="0" border="0" width="100%">
                <tbody><tr>
                  <td width="35"><img src="images/blank.gif" width="1" height="1" alt=""></td>
                </tr>
              </tbody></table></td>
            </tr>
            <tr>
              <td height="80"><img src="images/blank.gif" width="1" height="1" alt=""></td>
            </tr>
          </tbody></table></td>
          <td width="24"><img src="images/blank.gif" width="1" height="1" alt=""></td>
        </tr>
      </tbody></table></td>
      
    </tr>
  </tbody></table>

  



      
    `,
    text: `Copy and paste this link: ${CLIENT_ORIGIN}/confirm/${id}`
  })

}