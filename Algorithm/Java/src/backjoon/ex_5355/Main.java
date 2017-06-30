package backjoon.ex_5355;

import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 30..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        String[] testCase = sc.nextLine().split("");
        int T = Integer.parseInt(testCase[0]);

        while(T!=0){
            String[] str = sc.nextLine().split(" ");

            double num = Double.parseDouble(str[0]);

            for(int i=1; i<str.length; i++){
                if(str[i].equals("@")){
                    num *= 3;
                }else if(str[i].equals("%")){
                    num += 5;
                }else{
                    num -= 7;
                }
            }

            System.out.printf("%.2f\n", num);
            T--;
        }
    }
}
