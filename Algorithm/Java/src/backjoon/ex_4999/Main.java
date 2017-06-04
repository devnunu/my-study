package backjoon.ex_4999;

import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 2..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int Jlen = sc.next().length();
        int Dlen = sc.next().length();

        if(Jlen>=Dlen){
            System.out.print("go");
        }else{
            System.out.print("no");
        }
    }
}
