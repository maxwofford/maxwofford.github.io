function generateLink() {
  return `https://docs.google.com/forms/d/e/1FAIpQLSc65j4X47q075ouALLgXO1b1VWPPepvHTU_HlJ7XtldL0o3CA/viewform?usp=pp_url&entry.1088837722=${localStorage.getItem('username')}`
}

window.location.href = generateLink()