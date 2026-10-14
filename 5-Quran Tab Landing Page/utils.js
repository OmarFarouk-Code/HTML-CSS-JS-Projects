const faqInputs = document.querySelectorAll(".faq__input");

export const labelEventHandler = (event, label) => {
  if (event.key == "Enter") {
    console.log(label);
    labelEnterHandler(label);
  }
};

export const labelEnterHandler = (label) => {
  const inputID = label.getAttribute("for");
  const faqInput = document.querySelector(`#${inputID}`);

  if (faqInput.checked === true) {
    faqInput.checked = false;
  } else {
    faqInput.checked = true;
  }

  faqInputs.forEach((input) => {
    if (!(input.getAttribute("id") === inputID)) {
      input.checked = false;
    }
  });
};

export const observeElements = (sectionElements) => {
  const options = {
    threshold: 0.4,
  };

  const callback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      } else {
        entry.target.classList.remove("in-view");
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);

  sectionElements.forEach((element) => observer.observe(element));
};
