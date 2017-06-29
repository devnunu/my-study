package backjoon.ex_10822;

import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 29..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        String[] str = sc.next().split(",");
        int result = 0;

        for(int i =0; i<str.length; i++){
            result += Integer.parseInt(str[i]);
        }

        System.out.print(result);
    }
}
