import React, { useEffect, useState } from "react";
import styled from "styled-components";
import available from "../../assets/images/chair-available.png";
import reserve from "../../assets/images/chair-reserved.png";
import unavailable from "../../assets/images/chair-unavailable.png";
import { ChairData } from "../hall/Hall";
import { colors } from "./../../config/colors";
export interface ChairProps {
  data: ChairData;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}
const Chair: React.FC<ChairProps> = ({ data, onClick }) => {
  const [icon, setIcon] = useState(available);
  useEffect(() => {
    const swIcon = (dt: ChairData) => {
      switch (dt.isTaken) {
        case true:
          return unavailable;
        case "reserve":
          return reserve;
        case false:
          return available;
        default:
          return available;
      }
    };
    setIcon(swIcon(data));
  }, [data, onClick]);

  return (
    <Cnt onClick={onClick}>
      {data.vip && <Badge>VIP</Badge>}
      <img src={icon} alt="chair" />
    </Cnt>
  );
};

export default Chair;

const Cnt = styled.button`
  border: 0;
  background: none;
  position: relative;
  :focus {
    border: 0;
  }
`;

const Badge = styled.div`
  background-color: ${colors.golden};
  position: absolute;
  top: 0;
  left: 10px;
  border-radius: 5px;
  padding: 2px 3px;
  font-size: 9px;
  font-weight: bold;
`;
