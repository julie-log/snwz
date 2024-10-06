jQuery(document).ready(function () {
  const groupElements = document.querySelectorAll(".js-vbg-group");

  for (let i = 0; i < groupElements.length; i++) {
    const groupElement = groupElements[i];
    const elements = groupElement.querySelectorAll("[data-vbg]");

    for (let j = 0; j < elements.length; j++) {
      elements[j].addEventListener(
        "video-background-state-change",
        function (event) {
          const id = event.target.getAttribute("id");
          console.log(id, event.detail.type, event.detail.currentState);
        }
      );

      elements[j].addEventListener("video-background-ready", function (event) {
        const id = event.target.getAttribute("id");
        console.log("ready", id, event.detail.type, event.detail.currentState);
      });
    }
  }

  jQuery("[data-vbg]").youtube_background();

  const groups = new VideoBackgroundGroups(groupElements);

  for (const i in groups.instances) {
    const group = groups.instances[i].element;
    const vbgroup = groups.instances[i];

    const groupPrev = group.querySelector(".group-prev");
    const groupNext = group.querySelector(".group-next");
    const groupPlay = group.querySelector(".group-play");
    const groupPause = group.querySelector(".group-pause");
    const groupMute = group.querySelector(".group-mute");
    const groupUnmute = group.querySelector(".group-unmute");
    const groupFullscreen = group.querySelector(".group-fullscreen");

    groupPrev.addEventListener("click", function () {
      vbgroup.prev();
    });

    groupNext.addEventListener("click", function () {
      vbgroup.next();
    });

    groupPlay.addEventListener("click", function () {
      vbgroup.play();
    });

    groupPause.addEventListener("click", function () {
      vbgroup.pause();
    });

    groupMute.addEventListener("click", function () {
      vbgroup.mute();
    });

    groupUnmute.addEventListener("click", function () {
      vbgroup.unmute();
    });

    groupFullscreen.addEventListener("click", function () {
      console.log(vbgroup.currentElement.closest(".js-vbg-group"));
      vbgroup.currentElement.closest(".js-vbg-group").webkitRequestFullscreen();
    });
  }
});

const vbgs = document.querySelectorAll("[data-vbg]");
//for (let i = 0; i < vbgs.length; i++) {
//vbgs[i].addEventListener('video-background-state-change', function(event) {
//const id = event.target.getAttribute('id');
//console.log(id, event.detail.type, event.detail.currentState);
//});

/*
    vbgs[i].addEventListener('video-background-time-update', function(event) {
      const id = event.target.getAttribute('id');
      console.log(id, event.detail.type, event.detail.percentComplete);
    });
    */
//}

const srcChangeButtons = document.querySelectorAll(".src-change-button");

for (let i = 0; i < srcChangeButtons.length; i++) {
  srcChangeButtons[i].addEventListener("click", function (event) {
    const target = event.target;
    const src = target.getAttribute("data-src");
    const vbgElem = target
      .closest(".example-marquee")
      .querySelector("[data-vbg]");
    if (!vbgElem) return;
    const uid = vbgElem.getAttribute("data-vbg-uid");
    if (!uid) return;

    window.VIDEO_BACKGROUNDS.index[uid].setSource(src);
  });
}

const destroyBtns = document.querySelectorAll(".vbg-destroy");
for (let i = 0; i < destroyBtns.length; i++) {
  destroyBtns[i].addEventListener("click", function (event) {
    const target = event.target;
    const selector = target.getAttribute("data-selector");
    const vbgElem = document.querySelector(selector);
    window.VIDEO_BACKGROUNDS.destroy(vbgElem);
  });
}

const initBtns = document.querySelectorAll(".vbg-initialize");
for (let i = 0; i < initBtns.length; i++) {
  initBtns[i].addEventListener("click", function (event) {
    const target = event.target;
    const selector = target.getAttribute("data-selector");
    const src = target.getAttribute("data-src");
    const vbgElem = document.querySelector(selector);

    if (!vbgElem) return;
    if (vbgElem.getAttribute("data-vbg-uid"))
      window.VIDEO_BACKGROUNDS.destroy(vbgElem);

    if (src) {
      vbgElem.setAttribute("data-vbg", src);
    }
    window.VIDEO_BACKGROUNDS.add(vbgElem);
  });
}

const seekInputs = document.querySelectorAll(".seek-bar-wrapper");
for (let i = 0; i < seekInputs.length; i++) {
  new SeekBar(seekInputs[i]);
}

const playToggle = document.querySelectorAll(".toggle-play-button");
for (let i = 0; i < playToggle.length; i++) {
  new PlayToggle(playToggle[i]);
}

const muteToggle = document.querySelectorAll(".toggle-mute-button");
for (let i = 0; i < muteToggle.length; i++) {
  new MuteToggle(muteToggle[i]);
}
