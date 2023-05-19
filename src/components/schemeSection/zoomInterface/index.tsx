import AppButton from "../../common/AppButton"

enum operations {
  Add,
  Substract
}

interface IProps {
  zoomPercentages: number
  onChangeZoom: (newZoomPercentages: number) => void
  goToCenter?: () => void
}

export default function ZoomInterface({zoomPercentages, onChangeZoom, goToCenter} : IProps): JSX.Element {

  const handleOnClick = (operationType: operations): void => {
    const defaultNumber = 10

    switch (operationType) {
      case operations.Add:
        onChangeZoom(zoomPercentages + defaultNumber) 
        break;

      case operations.Substract:
        onChangeZoom(zoomPercentages - defaultNumber) 
        break;
    }
  }

  return (
    <div className="zoom-interface">
      <AppButton className={'app-button--secondary'}>List view</AppButton>

      <AppButton tooltip={['left', 'Go to center']} className={'app-button--symbol app-button--img'} onClick={goToCenter}>
        <img src="/images/centering.png" />
        <img className="hovered" src="/images/centering-white.png" />
      </AppButton>

      <div className="zoom-interface--controls">
        <AppButton className={'app-button--symbol'} onClick={() => handleOnClick(operations.Substract)}>-</AppButton>
        <AppButton>{zoomPercentages}%</AppButton>
        <AppButton className={'app-button--symbol'} onClick={() => handleOnClick(operations.Add)}>+</AppButton>
      </div>
    </div>
  );
}