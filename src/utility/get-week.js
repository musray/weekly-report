// 根据输入，计算一周从周一到周日的具体日期
// 输入 daySpan：0，本周；1，上周
// 输出：Array [20171023, 20171024...]

// 逻辑：
// 1. 获得今天
// 2. 根据今天，把本周和上周的日期全都算出来
// 3. 根据输入，返回本周或者上周的日期

const getWeek = ( lastWeek = false ) => {

  // 根据当前时间，找到上一个星期天
  let result = [];
  let current = new Date();

  if ( lastWeek === true ) {
    current.setDate( current.getDate() -7 );
  }

  for (let i = 1; i <= 7; i++) {
    let newDay = new Date(
      current.setDate( current.getDate() - current.getDay() + i )
    );
    result.push(newDay);
  }

  return result;
};

// const days = getWeek();
// console.log(days);

export default getWeek;