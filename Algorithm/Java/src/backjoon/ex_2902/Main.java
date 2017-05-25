package backjoon.ex_2902;

import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 25..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        String str = sc.nextLine();

        String[] strArr = str.split("-");

        for(int i = 0; i<strArr.length; i++){
            System.out.print(strArr[i].charAt(0));
        }
    }
}