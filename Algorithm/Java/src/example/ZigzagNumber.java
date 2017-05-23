package example;

/**
 * Created by homr on 2017. 5. 23..
 */
public class ZigzagNumber {
    public static void main(String[] args){
        System.out.println("지그재그 숫자 출력");

        int lineNumber = 0;
        int maxLine = 5;

        for(lineNumber = 1; lineNumber<=maxLine; lineNumber++){
            if(lineNumber%2==1){
                for(int i = (lineNumber-1)*5+1; i <= ((lineNumber-1)*5)+5; i++){
                    System.out.print(i+" ");
                }
                System.out.println("");
            }else{
                for(int i = lineNumber*5; i >= (lineNumber*5)-4; i--){
                    System.out.print(i+" ");
                }
                System.out.println("");
            }
        }
    }
}
