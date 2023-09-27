import Link from "next/link";

import S from "./Button.module.css";

const Button = (props) => {
  if (props.link) {
    return (
      <Link href={props.link} className={S.btn}>
        {props.children}
      </Link>
    );
  }

  return (
    <button onClick={props.onClick} className={S.btn}>
      {props.children}
    </button>
  );
};

export default Button;
