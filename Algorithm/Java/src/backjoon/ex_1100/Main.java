package backjoon.ex_1100;

import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 27..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        String[][] str = new String[8][8];
        int count=0;

        for(int i =0; i<8; i++){
            String[] strArr = sc.nextLine().split("");
            for(int j = 0; j<8; j++){
                String strData = strArr[j];
                if(i%2==0){
                    if(j%2==0&&strData.equals("F")){
                        count++;
                    }
                }else{
                    if(j%2==1&&strData.equals("F")){
                        count++;
                    }
                }
            }
        }

        System.out.println(count);

    }
}
