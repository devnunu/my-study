package backjoon.ex_10214;

import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 4..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int T = sc.nextInt();
        int yonseiScore = 0;
        int koreaScore = 0;

        while(T!=0){

            for(int i =0; i<9; i++){
                yonseiScore += sc.nextInt();
                koreaScore += sc.nextInt();
            }

            if(yonseiScore>koreaScore){
                System.out.println("Yonsei");
            }else if(yonseiScore<koreaScore){
                System.out.println("Korea");
            }else{
                System.out.println("Draw");
            }

            yonseiScore = 0;
            koreaScore = 0;

            T--;
        }
    }
}
