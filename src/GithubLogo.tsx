import github from "./assets/github.svg";

const GithubLogo = () => {
  return (
    <a
      href="https://github.com/MrYogesh0709/registraion-form"
      target="_blank"
      rel="noreferrer"
    >
      <img src={github} alt="github" className="github" />
    </a>
  );
};

export default GithubLogo;
