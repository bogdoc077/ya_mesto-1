class UserInfo {
    constructor(formInfo, userInfoText, userInfoJob) {
      this.formInfo = formInfo;
      this.userInfoText = userInfoText;
      this.userInfoJob = userInfoJob;
    }
    updateUserInfo(newname, newabout) {
      this.userInfoText.textContent = newname;
      this.userInfoJob.textContent = newabout;
      firstLastName.setAttribute('value', newname);
      about.setAttribute('value', newabout);
    }

    setAva(userInfoImages, link) {
      userInfoImages.setAttribute('style', `background-image: url(${link})`);
    }
  }