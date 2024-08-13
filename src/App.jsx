import React, { useState } from "react";

const App = () => {
  const [country, setCountry] = useState("");
  const [gold, setGold] = useState(0);
  const [silver, setSilver] = useState(0);
  const [bronze, setBronze] = useState(0);
  const [medalList, setMedalList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const divStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const inputStyle = {
    marginTop: "5px",
    width: "100%",
  };

  const addCountryHandler = () => {
    if (country === "") {
      alert("국가명을 입력해주세요.");
      return;
    }

    if (medalList.some((entry) => entry.country === country && !isEditing)) {
      alert("이미 등록된 국가입니다.");
      return;
    }

    if (isEditing) {
      const updatedList = [...medalList];
      updatedList[editIndex] = { country, gold, silver, bronze };
      setMedalList(updatedList);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setMedalList([
        ...medalList,
        { country, gold, silver, bronze },
      ]);
    }

    setCountry("");
    setGold(0);
    setSilver(0);
    setBronze(0);
  };

  const editCountryHandler = () => {
    const index = medalList.findIndex((entry) => entry.country === country);
    if (index !== -1) {
      setGold(medalList[index].gold);
      setSilver(medalList[index].silver);
      setBronze(medalList[index].bronze);
      setEditIndex(index);
      setIsEditing(true);
    } else {
      alert("수정할 국가를 찾을 수 없습니다.");
    }
  };

  const deleteHandler = (index) => {
    const updatedList = medalList.filter((_, i) => i !== index);
    setMedalList(updatedList);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            marginTop: "20px",
            fontSize: "45px",
          }}
        >
          2024 파리 올림픽
        </h1>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div style={divStyle}>
          <label htmlFor="country">국가명🇰🇷</label>
          <input
            id="country"
            type="text"
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={divStyle}>
          <label htmlFor="gold">금메달🥇</label>
          <input
            id="gold"
            type="number"
            value={gold}
            onChange={(event) => setGold(Number(event.target.value) || 0)}
            style={inputStyle}
          />
        </div>
        <div style={divStyle}>
          <label htmlFor="silver">은메달🥈</label>
          <input
            id="silver"
            type="number"
            value={silver}
            onChange={(event) => setSilver(Number(event.target.value) || 0)}
            style={inputStyle}
          />
        </div>
        <div style={divStyle}>
          <label htmlFor="bronze">동메달🥉</label>
          <input
            id="bronze"
            type="number"
            value={bronze}
            onChange={(event) => setBronze(Number(event.target.value) || 0)}
            style={inputStyle}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <button onClick={addCountryHandler}>
            {isEditing ? "수정 완료" : "국가 추가"}
          </button>
          <button onClick={editCountryHandler}>수정하기</button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "20px",
          width: "100%",
        }}
      >
        <div style={divStyle}>
          <h2>메달 리스트</h2>
          {medalList.length === 0 ? (
            <p>아직 추가된 국가가 없습니다. 메달을 추적하세요!</p>
          ) : (
            <table style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ fontSize: "18px", fontWeight: "bold", backgroundColor: "#f0f0f0", padding: "50px", textAlign: "left" }}>국가이름🇰🇷</th>
                  <th style={{ fontSize: "18px", fontWeight: "bold", backgroundColor: "#f0f0f0", padding: "50px", textAlign: "left" }}>금메달🥇</th>
                  <th style={{ fontSize: "18px", fontWeight: "bold", backgroundColor: "#f0f0f0", padding: "50px", textAlign: "left" }}>은메달🥈</th>
                  <th style={{ fontSize: "18px", fontWeight: "bold", backgroundColor: "#f0f0f0", padding: "50px", textAlign: "left" }}>동메달🥉</th>
                  <th style={{ fontSize: "18px", fontWeight: "bold", backgroundColor: "#f0f0f0", padding: "50px", textAlign: "left" }}>삭제</th>
                </tr>
              </thead>
              <tbody>
                {medalList.map((entry, index) => (
                  <tr key={index}>
                    <td style={{ borderBottom: "1px solid black", padding: "10px" }}>
                      {entry.country}
                    </td>
                    <td style={{ borderBottom: "1px solid black", padding: "10px" }}>
                      {entry.gold}
                    </td>
                    <td style={{ borderBottom: "1px solid black", padding: "10px" }}>
                      {entry.silver}
                    </td>
                    <td style={{ borderBottom: "1px solid black", padding: "10px" }}>
                      {entry.bronze}
                    </td>
                    <td style={{ borderBottom: "1px solid black", padding: "10px" }}>
                      <button onClick={() => deleteHandler(index)}>삭제</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
