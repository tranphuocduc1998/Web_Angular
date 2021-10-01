import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.scss']
})
export class CardContainerComponent implements OnInit {

  data1: CardContainerData[] = [
    {
      title: 'Cảnh báo nhân sự đến tuổi nghỉ hưu',
      content: '<p modifiers="{}"><span class="text-danger" modifiers="{}">Quá hạn: <span class="field_overdue_records" modifiers="{}">0</span></span><br modifiers="{}"><span class="text-info" modifiers="{}">Đến hạn: <span class="field_due_records" modifiers="{}">0</span></span><br modifiers="{}"><span class="text-warning" modifiers="{}">Chưa đến hạn: <span class="field_not_due_yet_records" modifiers="{}">0</span></span></p>',
      imgUrl: 'https://demo.vnerp.vn/web/image?model=vnpt.hr.warning&field=image&id=1&unique='
    },
    {
      title: 'Cảnh báo hết hạn gián đoạn',
      content: '<p modifiers="{}"><span class="text-danger" modifiers="{}">Quá hạn: <span class="field_overdue_records" modifiers="{}">0</span></span><br modifiers="{}"><span class="text-info" modifiers="{}">Đến hạn: <span class="field_due_records" modifiers="{}">0</span></span><br modifiers="{}"><span class="text-warning" modifiers="{}">Chưa đến hạn: <span class="field_not_due_yet_records" modifiers="{}">0</span></span></p>',
      imgUrl: 'https://demo.vnerp.vn/web/image?model=vnpt.hr.warning&field=image&id=3&unique='
    }
  ];
  public cardData: CardContainerData[];

  @Input() set dataSource(data: CardContainerData[]) {
    if (!data) {
      return;
    }
    this.cardData = data;
  }

  constructor() { }

  ngOnInit(): void {
  }

}

export interface CardContainerData {
  title: string;
  content: string;
  imgUrl: string;
}
