package backjoon.ex_5586;

import java.util.Scanner;

/**
 * Created by homr on 2017. 7. 3..
 */
public class Main {
    public static void main(String[] arg){
        Scanner sc = new Scanner(System.in);
        String[] str = sc.next().split("");
        int[] count = new int[2];

        for(int i=0; i<str.length-2; i++){
            if(str[i].equals("J")&&str[i+1].equals("O")&&str[i+2].equals("I")){
                count[0]++;
            }else if(str[i].equals("I")&&str[i+1].equals("O")&&str[i+2].equals("I")){
                count[1]++;
            }
        }


        System.out.println(count[0]);
        System.out.println(count[1]);
    }
}
