package backjoon.ex_2446;

import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 27..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int num = sc.nextInt();
        String footer = "";

        for(int i = 0; i<num; i++){
            String star = "";

            for(int j = 0; j<i; j++){
                star += " ";
            }
            for(int j = 2*(num-i)-1; j>0; j--){
                star += "*";
            }

            System.out.println(star);

            if(i<num-1){
                footer = star + "\n" + footer;
            }
        }

        System.out.print(footer);
    }
}
