package backjoon.ex_2490;

import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 31..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);

        while(sc.hasNext()){
            String[] arr = sc.nextLine().split(" ");
            int count =0;

            for(int i=0; i<arr.length; i++){
                if(arr[i].equals("0")){
                    count++;
                }
            }

            if(count==0){
                System.out.println("E");
            }else if(count==1){
                System.out.println("A");
            }else if(count==2){
                System.out.println("B");
            }else if(count==3){
                System.out.println("C");
            }else{
                System.out.println("D");
            }

        }
    }
}
