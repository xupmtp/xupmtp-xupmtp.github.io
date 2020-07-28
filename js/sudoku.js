                //測試用案例
                // var S=[[ 8, 0, 0, 0, 0, 0, 0, 0, 0 ],
                //             [ 0, 0, 3, 6, 0, 0, 0, 0, 0 ],
                //             [ 0, 7, 0, 0, 9, 0, 2, 0, 0 ],
                //             [ 0, 5, 0, 0, 0, 7, 0, 0, 0 ],
                //             [ 0, 0, 0, 0, 4, 5, 7, 0, 0 ],
                //             [ 0, 0, 0, 1, 0, 0, 0, 3, 0 ],
                //             [ 0, 0, 1, 0, 0, 0, 0, 6, 8 ],
                //             [ 0, 0, 8, 5, 0, 0, 0, 1, 0 ],
                //             [ 0, 9, 0, 0, 0, 0, 4, 0, 0 ]];
    //    var S = [[1,3,0,8,6,5,0,0,9],
    //             [0,0,8,0,0,4,1,0,2],
    //             [0,0,0,1,2,0,0,0,0],
    //             [0,0,7,6,0,0,9,0,3],
    //             [9,1,5,4,0,0,0,8,7],
    //             [6,0,3,0,1,7,0,5,0],
    //             [0,0,0,0,0,0,3,4,5],
    //             [0,0,6,7,0,3,8,9,0],
    //             [0,0,9,0,8,0,0,0,6]];
                //             console.log(Math.floor(8/3)*3); 
                function ck(){
                    for(var i=0;i<9;i++){
                        S[i]= new Array(9);
                        for(var j=0;j<9;j++){
                            S[i][j]=Number($("#"+i+j).html());
                        }
                    }
                    try{
                    suDoku(0,0);
                    }catch(e){
                        console.log(e);
                    }
                }                           
                function suDoku( i,  j) {
                // 到達根結點,輸出答案
                if (i == 8 && j == 9) {
                    print();
                    //第一個答案出現時終止所有程式
                    throw "輸出答案";
                    // return;
                }
                if (j == 9) {
                    i++;
                    j = 0;
                }
                // 每次只對未更改過的格子做判斷,避免改到題目格子
                if (S[i][j] == 0) {
                    for (var k = 1; k <= 9; k++) {
                        if (check(i, j, k)) {
                            S[i][j] = k;
                            // 往前一格,不需要動i值因上面有做判斷
                            suDoku(i, j + 1);
                             //初始化節點,若前面皆符合條件則最後會執行輸出答案, 否則從頭開始遍歷
                            S[i][j] = 0;
                        }
                    }
                } else
                    suDoku(i, j + 1);
            }
        
            // 判斷是否重複
            /**
             * 
             * @param i 橫行數
             * @param j 直列數
             * @param k 要放入的數
             * @return 是否重複
             */
            function check( i,  j,  k) {
                for (var r = 0; r < S.length; r++)
                    // 直,橫行判斷
                    if (S[i][r] == k || S[r][j] == k)
                        return false;
                // 九宮格判斷
                for (var ci = Math.floor(i / 3) * 3, ii = Math.floor(i / 3) * 3; ci < ii + 3; ci++) {
                    for (var cj = Math.floor(j / 3) * 3, jj = Math.floor(j / 3) * 3; cj < jj + 3; cj++) {
                        if (S[ci][cj] == k)
                            return false;
                    }
                }
                return true;
            }
        
            function print() {
                for(var i=0;i<9;i++){
                    for(var j=0;j<9;j++){
                       $("#"+i+j).html(S[i][j]);
                    }
                }
            }