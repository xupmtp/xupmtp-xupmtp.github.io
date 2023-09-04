function main() {
  // 初始化陣列
  const S = range(9).map((_, i) => range(9).map((_, j) => Number($("#" + i + j).html())))
  try {
    sudoku(S, 0, 0);
  } catch (e) {
    console.log(e)
  }
}

function initSudoku() {
  range(9).forEach((_, i) => range(9).forEach((_, j) => $("#" + i + j).html('')))
}

function sudoku(S, i, j) {
  // 到達根結點
  if (i === 8 && j === 9) {
    // 輸出答案
    S.forEach((arr, i) => arr.forEach((v, j) => $("#" + i + j).html(v)))
    // 強制終止遞迴
    throw "輸出答案"
  }
  if (j === 9) {
    i++;
    j = 0;
  }
  //
  // if (S[i][j] !== 0) {
  //   sudoku(S, i, j + 1);
  //   return
  // }

  // 每次只對未更改過的格子做判斷,避免改到題目格子
  if (S[i][j] === 0) {
    for (let k = 1; k <= 9; k++) {
      if (check(S, i, j, k)) {
        S[i][j] = k;
        // 往前一格,不需要動i值因上面有做判斷
        sudoku(S, i, j + 1);
        //初始化節點,若前面皆符合條件則最後會執行輸出答案, 否則從頭開始遍歷
        S[i][j] = 0;
      }
    }
  } else sudoku(S, i, j + 1);
}

/**
 * 判斷是否重複
 * @param S arr
 * @param i 橫行數
 * @param j 直列數
 * @param k 要放入的數
 * @return boolean
 */
function check(S, i, j, k) {
  // 橫行判斷
  if (S[i].some(v => v === k)) return false
  // 直行判斷
  if (S.some(arr => arr[j] === k)) return false
  // 九宮格判斷
  for (let ci = Math.floor(i / 3) * 3, ii = Math.floor(i / 3) * 3; ci < ii + 3; ci++) {
    for (let cj = Math.floor(j / 3) * 3, jj = Math.floor(j / 3) * 3; cj < jj + 3; cj++) {
      if (S[ci][cj] === k) return false;
    }
  }
  return true;
}

function range(n) {
  const res = []
  for (let i = 0; i < n; i++) res.push(0)
  return res
}