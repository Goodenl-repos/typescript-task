import { useMemo, useState } from "react";

import DraggableWindow from './components/schemeSection/draggableWindow'
import ZoomInterface from './components/schemeSection/zoomInterface'


export default function App(): JSX.Element {
  const [zoomPercentages, setZoompercentages] = useState<number>(100)
  const [goToCenterFlag, setGoToCenterFlag] = useState<boolean>(false)

  const servicesCount: number = 0;

  const zoomIndex = useMemo<number>(() => {
    return (zoomPercentages / 100) > 0 ? zoomPercentages / 100 : 0
  }, [zoomPercentages]);


  const handleOnClick = (newZoomPercentages: number): void => {
    setZoompercentages(() => newZoomPercentages) 
  }

  const handleGoToCenter = (): void => {
    setGoToCenterFlag(true)

    setTimeout(() => {
      setGoToCenterFlag(false)
    }, 200)
  }

  return (
    <div className="page">
      <header className='header'>
        <h2 className='d-flex align-center'>
          Services
          <span className='services-count'>{ servicesCount}</span>
        </h2>
        <ZoomInterface
          zoomPercentages={zoomPercentages}
          onChangeZoom={handleOnClick}
          goToCenter={handleGoToCenter}
        />
      </header>
      <DraggableWindow zoomIndex={zoomIndex} goToCenterFlag={goToCenterFlag}/>
    </div>
  );
}
