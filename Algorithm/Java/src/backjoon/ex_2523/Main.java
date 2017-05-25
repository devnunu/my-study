package backjoon.ex_2523;

import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 25..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int num = sc.nextInt();

        String footer = "";

        for(int i = 0; i<num; i++){
            String str = "";

            for(int j = 0; j<=i; j++){
                str += "*";
            }

            System.out.println(str);

            if(i!=num-1){
                footer = str+ "\n" + footer;
            }
        }

        System.out.print(footer);
    }
}
