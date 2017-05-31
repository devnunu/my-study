package backjoon.ex_10798;

import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 31..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        String[][] strArr = new String[15][15];
        int count = 0;

        while(sc.hasNext()){
            String[] str = sc.nextLine().split("");
            for(int i=0; i<str.length; i++){
                strArr[count][i] = str[i];
            }
            count++;
        }

        for(int i =0; i<15; i++){
            for(int j=0; j<15; j++){
                if(strArr[j][i]!=null) {
                    System.out.print(strArr[j][i]);
                }
            }
        }
    }
}