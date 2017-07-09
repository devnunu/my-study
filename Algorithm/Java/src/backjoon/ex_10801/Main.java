package backjoon.ex_10801;

import java.util.Scanner;

/**
 * Created by homr on 2017. 7. 9..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int[] aArr = new int[10];
        int[] bArr = new int[10];
        int[] score = {0,0};


        for(int i =0; i<10; i++){
            aArr[i] = sc.nextInt();
        }
        for(int i =0; i<10; i++){
            bArr[i] = sc.nextInt();
        }

        for(int i =0; i<10; i++){
            if(aArr[i]>bArr[i]){
                score[0]++;
            }else if(aArr[i]<bArr[i]){
                score[1]++;
            }
        }

        if(score[0]>score[1]){
            System.out.println("A");
        }else if(score[0]<score[1]){
            System.out.println("B");
        }else{
            System.out.println("D");
        }
    }
}
