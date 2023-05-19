interface IProps {
  widthBox: string
  children: React.ReactNode
}

export default function AppTooltip({widthBox, children}: IProps){
  return (
    <span className="tooltip" style={{width: widthBox + "px"}}>
      {children}
    </span>
  );
}