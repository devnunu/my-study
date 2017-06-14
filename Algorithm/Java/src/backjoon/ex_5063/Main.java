package backjoon.ex_5063;

import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 14..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int T = sc.nextInt();

        while(T!=0){
            int result = sc.nextInt()-sc.nextInt()+sc.nextInt();
            if(result==0){
                System.out.println("does not matter");
            }else if(result>0){
                System.out.println("do not advertise");
            }else{
                System.out.println("advertise");
            }
            T--;
        }
    }
}
