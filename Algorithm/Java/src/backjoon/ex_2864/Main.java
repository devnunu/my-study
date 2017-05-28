package backjoon.ex_2864;

import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 27..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        String[] num1 = Integer.toString(sc.nextInt()).split("");
        String[] num2 = Integer.toString(sc.nextInt()).split("");

        String maxNum1="", minNum1="";
        String maxNum2="", minNum2="";

        for(int i = 0; i<num1.length; i++){
            if(num1[i].equals("6")){
                maxNum1 += num1[i];
                minNum1 += "5";
            }else if(num1[i].equals("5")){
                maxNum1 += "6";
                minNum1 += num1[i];
            }else{
                maxNum1 += num1[i];
                minNum1 += num1[i];
            }
        }

        for(int i = 0; i<num2.length; i++){
            if(num2[i].equals("6")){
                maxNum2 += num2[i];
                minNum2 += "5";
            }else if(num2[i].equals("5")){
                maxNum2 += "6";
                minNum2 += num2[i];
            }else{
                maxNum2 += num2[i];
                minNum2 += num2[i];
            }
        }

        System.out.print(Integer.parseInt(minNum1)+Integer.parseInt(minNum2));
        System.out.print(" ");
        System.out.print(Integer.parseInt(maxNum1)+Integer.parseInt(maxNum2));


    }
}
