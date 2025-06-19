import React from "react";
import { useTranslation } from "react-i18next";
import { TextComponentProps } from "../../types";
// import { useColors } from "../../config/color";

function Text({ text, className }: TextComponentProps) {
  const { t } = useTranslation();
  return <p className={className}>{t(text)}</p>;
}

export default React.memo(Text);
