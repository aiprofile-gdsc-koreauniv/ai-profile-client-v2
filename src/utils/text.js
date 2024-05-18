export const renderTitle = (step, gender) => {
  if (step === 0) {
    return (
      <div>
        성별을 <br />
        골라주세요
      </div>
    );
  } else if (step === 1) {
    if (gender === "boy") {
      return (
        <div>
          더 가까운 체형을 <br />
          골라주세요
        </div>
      );
    } else if (gender === "girl") {
      return (
        <div>
          헤어 기장은 <br />
          어느 정도인가요?
        </div>
      );
    }
  } else if (step === 2) {
    return (
      <div>
        안경을 <br />
        착용하시나요?
      </div>
    );
  }
};
