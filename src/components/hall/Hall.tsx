import React, { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { colors } from "../../config/colors";
import { samp_data } from "./../../data/sample_data";
import Chair from "../chair/Chair";
export interface HallProps {}
export interface ChairData {
  id: number;
  row: number;
  col: number;
  isTaken: boolean | "reserve";
  vip?: boolean;
}

const Hall: FC<HallProps> = () => {
  //Hooks
  const [datas, setData] = useState<ChairData[][]>([]);

  useEffect(() => {
    const grouped = groupByRow(samp_data);
    setData(Array.from(grouped));
  }, []);

  // Logics
  function groupByRow(dt: ChairData[]) {
    const arr: ChairData[][] = [];
    dt.forEach((it) => {
      const filtered = dt.filter((item) => item.row === it.row);
      const sorted = filtered.sort((a, b) => a.col - b.col);
      if (it.row) arr.push([...sorted]);
    });
    var unique = arr
      .map((cur) => JSON.stringify(cur))
      .filter(function (curr, index, self) {
        return self.indexOf(curr) === index;
      })
      .map((cur) => JSON.parse(cur));
    return unique;
  }

  function reserveChair(item: ChairData): void {
    let dt = [...datas];
    dt.map((grp) => {
      const chair = grp.find((it) => it.id === item.id);
      if (chair && !chair.isTaken) {
        return (chair.isTaken = "reserve");
      }
      if (chair && chair.isTaken === "reserve") {
        return (chair.isTaken = false);
      }
      if (chair && chair.isTaken) {
        toast.error("This chair is taken.");
      }
      return null;
    });
    setData([...dt]);
  }

  return (
    <Cnt>
      <Head> STAGE IS HERE</Head>
      <Rows>
        {datas.map((item, key) => (
          <RowContainer key={key}>
            {item.map((sub, x) => (
              <Chair key={x} onClick={() => reserveChair(sub)} data={sub} />
            ))}
          </RowContainer>
        ))}
      </Rows>
    </Cnt>
  );
};

export default Hall;
const Cnt = styled.div`
  background: ${colors.dark};
  padding:20px;
  color:${colors.white};
  border-radius:10px;
`;
const Rows = styled.div``;
const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
`;

const Head = styled.h2`
  text-align: center;
`;
