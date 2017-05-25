package backjoon.ex_2744;

import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 25..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        String str = sc.nextLine();
        String strUpper = str.toUpperCase();
        String strLower = str.toLowerCase();

        for(int i = 0; i<str.length(); i++){
            if(strUpper.charAt(i)==str.charAt(i)){
                System.out.print(strLower.charAt(i));
            }else{
                System.out.print(strUpper.charAt(i));
            }
        }
    }
}
