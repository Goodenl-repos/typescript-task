import React, { useState } from "react";
import AppTooltip from "./AppTooltip";

interface IProps {
  style?: React.CSSProperties
  className?: string
  tooltip?: string[]
  onClick?: () => any
  children: React.ReactNode
}

export default function ZoomInterface({style, className, tooltip, onClick, children}: IProps): JSX.Element {
  const [tooltipShow, setTooltipShow] = useState(false)

  const handleOnMouseEnter = (e: React.SyntheticEvent): void => {
    if(tooltip && tooltip.length !== 0) {
      setTooltipShow(true)
    }
  }

  const handleOnMouseLeave = (e: React.SyntheticEvent): void => {
    if(tooltip && tooltip.length !== 0) {
      setTooltipShow(false)
    }
  }

  return (
    <button onClick={onClick} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave} style={style} className={"app-button " + className}>
      {children}

      {(tooltip && tooltip.length) && tooltipShow && <AppTooltip widthBox={'120'}>{tooltip[1]}</AppTooltip>}
    </button>
  );
}