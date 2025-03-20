import { useMutation, useStorage } from "@liveblocks/react";
import { useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";

const Marker = Array.from({ length: 83 }, (_, i) => i);

const Ruler = () => {
  const leftMargin = useStorage((root) => root.leftMargine) ?? 56;
  const setLeftMargin = useMutation(({ storage }, position: number) => {
    storage.set("leftMargine", position);
  }, []);
  const rightMargin = useStorage((root) => root.rightMargine) ?? 56;
  const setRightMargin = useMutation(({ storage }, position: number) => {
    storage.set("rightMargine", position);
  }, []);

  // const [leftMargin, setLeftMargin] = useState(56);
  // const [rightMargin, setRightMargin] = useState(56);
  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);
  const rulerRef = useRef<HTMLDivElement>(null);

  const handleMouseDownLeft = () => {
    setIsDraggingLeft(true);
  };
  const handleMouseDownRight = () => {
    setIsDraggingRight(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if ((isDraggingLeft || isDraggingRight) && rulerRef.current) {
      const Container = rulerRef.current.querySelector("#ruler-container");
      if (Container) {
        const ContainerRect = Container.getBoundingClientRect();
        const relativeX = e.clientX - ContainerRect.left;
        const rawPosition = Math.max(0, Math.min(816, relativeX));
        if (isDraggingLeft) {
          const MaxLeftPosition = 816 - rightMargin - 100;
          const newLeftPosition = Math.min(rawPosition, MaxLeftPosition);
          setLeftMargin(newLeftPosition);
        }
        if (isDraggingRight) {
          const MaxRightPosition = 816 - (leftMargin + 100);
          const newRightPosition = Math.max(816 - rawPosition, 0);
          const constrainedRightPosition = Math.min(
            newRightPosition,
            MaxRightPosition
          );
          setRightMargin(constrainedRightPosition);
        }
      }
    }
  };

  const handleMouseUp = () => {
    setIsDraggingLeft(false);
    setIsDraggingRight(false);
  };
  const handleLeftDoubleClick = () => {
    setLeftMargin(56);
  };
  const handleRightDoubleClick = () => {
    setRightMargin(56);
  };

  return (
    <div
      ref={rulerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="h-6 w-[816px] mx-auto border-b border-gray-300 flex items-end relative select-none print:hidden"
    >
      <div id="ruler-container" className="w-full h-full relative">
        <MarkerCom
          position={leftMargin}
          isLeft={true}
          isDragging={isDraggingLeft}
          onMouseDown={handleMouseDownLeft}
          onDoubleClick={handleLeftDoubleClick}
        />
        <MarkerCom
          position={rightMargin}
          isLeft={false}
          isDragging={isDraggingRight}
          onMouseDown={handleMouseDownRight}
          onDoubleClick={handleRightDoubleClick}
        />
        <div className=" absolute inset-x-0 bottom-0 h-full">
          <div className=" relative h-full w-[816px]">
            {Marker.map((marker) => {
              const position = (marker * 816) / 82;
              return (
                <div
                  key={marker}
                  className={`bottom-0  absolute  `}
                  style={{ left: `${position}px` }}
                >
                  {marker % 10 === 0 && (
                    <>
                      <div className="absolute bottom-0 w-[1px] h-2.5 bg-neutral-500" />
                      <span className="absolute bottom-2 text-[10px] text-neutral-500 transform -translate-x-1/2">
                        {marker / 10 + 1}
                      </span>
                    </>
                  )}
                  {marker % 5 === 0 && marker % 10 !== 0 && (
                    <>
                      <div className="absolute bottom-0 w-[1px] h-1.5 bg-neutral-700" />
                    </>
                  )}
                  {marker % 5 !== 0 && (
                    <>
                      <div className="absolute bottom-0 w-[1px] h-1 bg-neutral-700" />
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

interface MarkerProps {
  position: number;
  isLeft: boolean;
  isDragging: boolean;
  onMouseDown: () => void;
  onDoubleClick: () => void;
}

const MarkerCom = ({
  position,
  isLeft,
  isDragging,
  onMouseDown,
  onDoubleClick,
}: MarkerProps) => {
  return (
    <div
      className="absolute top-0 w-4 h-full cursor-ew-resize z-[5] group -ml-2"
      style={{ [isLeft ? "left" : "right"]: `${position}px` }}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      <FaCaretDown className=" absolute left-1/2 top-0 h-full fill-blue-500 transform -translate-x-1/2" />
      <div
        className=" absolute left-1/2 transform -translate-x-1/2 transition-opacity duration-150"
        style={{
          height: "100vh",
          width: "1px",
          backgroundColor: "#3B83F7",
          transform: "scaleX(0.5)",
          display: isDragging ? "block" : "none",
        }}
      />
    </div>
  );
};

export default Ruler;
