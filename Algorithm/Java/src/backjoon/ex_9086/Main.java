package backjoon.ex_9086;

import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 2..
 */
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int num = sc.nextInt();
        while(num != 0){
            String str = sc.next();
            if(str.length()==1){
                System.out.print(str);
                System.out.println(str);
                num--;
                continue;
            }
            System.out.print(str.charAt(0));
            System.out.println(str.charAt(str.length()-1));
            num--;
        }
    }
}
