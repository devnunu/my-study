package backjoon.ex_1094;

import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 28..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        String[] num = Integer.toBinaryString(sc.nextInt()).split("");
        int count = 0;

        for(int i=0; i<num.length; i++){
            if(num[i].equals("1")){
                count++;
            }
        }
        System.out.println(count);
    }
}
