import { AudioUnitType } from './../../../shared/enums/audio-unit-type.enums';
import { environment } from './../../../../environments/environment.prod';
import {OAuthService} from 'angular-oauth2-oidc';
import {AudioService} from './../../../shared/services/audio.service';
import {filter, takeUntil} from 'rxjs/operators';
import {ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FileItem, FileUploader, FileUploaderOptions} from 'ng2-file-upload';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {PlayStateControlService} from 'app/shared/services/play-state-control.service';
import {AudioState} from 'app/shared/models/audio-state.model';
import {LayoutService} from 'app/shared/services/layout.service';
import {JwtAuthService} from '../../../shared/services/auth/jwt-auth.service';
@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit, OnDestroy {
    @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;

    playState: boolean;
    currentSampleIndex: number;
    selectable = true;
    removable = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    fruitCtrl = new FormControl();
    filteredFruits: Observable<string[]>;
    // fruits: string[] = ['Lemon'];
    allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

    private uploadOptions: FileUploaderOptions;
    private imageUploadOptions: FileUploaderOptions;
    private uploadUrl: string;
    public uploader: FileUploader;
    public imageUploader: FileUploader;
    public hasBaseDropZoneOver = true;
    console = console;
    formData = {};
    public formsMap: Map<FileItem, FormGroup>;
    public isSideNavOpen: boolean;
    basicForm: FormGroup;
    private fileItemForm: FormGroup;
    public formsSubject: ReplaySubject<Map<FileItem, FormGroup>>;
    public currentSampleSubject$: BehaviorSubject<number>;
    durationInSeconds = 5;
    public minimumBPM = 0;
    public maximumBPM = 300;
    public minimumTags = 5;
    public maximumTags = 10;
    public minimumMoods = 1;
    public maximumMoods = 3;
    public maximumSampleTitle = 200;

    genreList: string[] = ['Blues', 'Classical', 'Country', 'Electronic', 'Hip Hop/Rap', 'Jazz', 'Latin', 'Pop', 'RnB/Soul', 'Reggea', 'Rock', 'Spoken Word'];
    regionList: string[] = ['Northern Europe', 'Western Europe', 'Southern Europe', 'Eastern Europe', 'Middle East', 'Caribbean', 'Oceania, Pacific', 'Southern Africa', 'Northern Africa', 'Western Africa', 'Eastern Africa', 'South Asia/India', 'East Asia', 'North America', 'South America', 'Central America'];
    trackTypeList: string[] = ['Accordion', 'Bass', 'Drum', 'Edits', 'Flute', 'FX track', 'Guitar', 'Horns', 'Instrumental', 'Keyborads', 'Master', 'Percussion', 'Shruti Box', 'Sound FX', 'Strings', 'Vocals', 'Whistle'];
    songKeyList: string[] = ['A major', 'A minor', 'A flat major', 'A flat minor', 'B major', 'B minor', 'B flat major', 'B flat minor', 'C major', 'C minor', 'D major', 'D minor', 'D flat major', 'D flat minor', 'E major', 'E minor', 'E flat major', 'E flat minor', 'F major', 'F minor', 'G major', 'G minor', 'G flat major', 'G flat minor'];
    moodsList: string[] = ['ambient', 'angry', 'bouncy', 'calming', 'carefree', 'cheerful', 'cold', 'complex', 'cool', 'dark', 'disturbing', 'dramatic', 'dreamy', 'eerie', 'elegant', 'energetic', 'enthusiastic', 'epic', 'fun', 'funky', 'futuristic', 'gentle', 'gleeful', 'gloomy', 'groovy', 'happy', 'harsh', 'haunting', 'humorous', 'hypnotic', 'industrial', 'intense', 'intimate', 'joyous', 'laid-back', 'light', 'lively', 'manic', 'mellow', 'mystical', 'ominous', 'passionate', 'pastoral', 'peaceful', 'playful', 'poignant', 'quiet', 'rebellious', 'reflective', 'romantic', 'rowdy', 'sad', 'sentimental', 'sexy', 'smooth', 'soothing', 'sophisticated', 'spacey', 'spiritual', 'strange', 'sweet', 'theater', 'trippy', 'warm', 'whimsical'];

    constructor(
        private _snackbar: MatSnackBar,
        private playStateControlService: PlayStateControlService,
        private audioService: AudioService,
        private changeDetectorRef: ChangeDetectorRef,
        private layoutService: LayoutService,
        private fb: FormBuilder,
        private jwt: JwtAuthService,
        private oauthService: OAuthService
    ) {
        this.uploadUrl = `${environment.apiURL.baseUrl}${environment.apiURL.audioPath.protected.root}${environment.apiURL.audioPath.protected.uploadSamples}`;
        // // https://stackoverflow.com/questions/60303518/angular-ng2-file-upload-input-file-filter-not-working-for-png-in-internet-explor
        this.uploadOptions = {
            url: this.uploadUrl,
            authToken: 'Bearer ' + jwt.getJwtToken(),
            allowedMimeType: ['audio/wav', 'audio/mp3', 'audio/mpeg'],
            allowedFileType: ['audio'],
            // 500 MB max
            maxFileSize: 500 * 1024 * 1024
        };

        this.imageUploadOptions = {
            url: this.uploadUrl,
            allowedMimeType: ['image/jpeg', 'image/png', 'image/gif'],
            allowedFileType: ['image'],
            // 100 MB max
            maxFileSize: 100 * 1024 * 1024
        };
        this.uploader = new FileUploader(this.uploadOptions);
        this.imageUploader = new FileUploader(this.imageUploadOptions);

        this.formsMap = new Map<FileItem, FormGroup>();
        this.formsSubject = new ReplaySubject<Map<FileItem, FormGroup>>();
        this.currentSampleSubject$ = new BehaviorSubject<number>(0);

        // this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
        //   startWith(null),
        //   map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));

        this.playStateControlService.playState$.pipe(
            takeUntil(this.playStateControlService.playStateServiceDestroyed$)
        ).subscribe((playState: boolean) => {
            this.playState = playState;
        });

        this.currentSampleSubject$.subscribe((index: number) => {
            this.currentSampleIndex = index;
        });

        this.audioService.audioState$.pipe(takeUntil(this.audioService.audioServiceDestroyed$)).subscribe((state: AudioState) => {
            switch (state.status) {
                case 'finish':
                    this.changeDetectorRef.detectChanges();
                    break;
                case 'playing':
                    break;
            }
        });

        this.oauthService.events
            .pipe(filter((e: any) => {
                console.log(e);

                return e.type === 'token_refreshed';
            }))
            .subscribe(() => {
                console.log('Acces Token changed in FileUploadOptions');
                // setTimeout(() => {
                this.uploadOptions.authToken = 'Bearer ' + this.jwt.getJwtToken();
                this.uploader.setOptions(this.uploadOptions);
                // this.uploadOptions.headers = [{ name: 'x-ms-blob-type', value : 'BlockBlob' }];
                // },1000);
            });
    }

    ngOnInit() {

        this.playStateControlService.emitPlayState(false);
        this.uploader.onBuildItemForm = (fileItem: FileItem, formData: FormData) => {
            // https://stackoverflow.com/questions/60303518/angular-ng2-file-upload-input-file-filter-not-working-for-png-in-internet-explor
            // this.uploadOptions = {
            //   url: this.uploadUrl,
            //   authToken: 'Bearer ' + this.jwt.getJwtToken(),
            //   allowedMimeType: ['audio/wav', 'audio/mp3', 'audio/mpeg'],
            //   allowedFileType: ['audio'],
            //   //500 MB max
            //   maxFileSize: 500 * 1024 * 1024
            // }
            // this.uploadOptions.authToken = 'Bearer ' + this.jwt.getJwtToken();
            console.log(this.uploadOptions);
            console.log(fileItem);
            console.log(((this.fileItemForm.controls['image'] as FormGroup).controls['file'].value as FileItem)._file);
            console.log('Yuhee');
          // tslint:disable-next-line:max-line-length
            formData.append('audioUnitType', 'Sample');
            formData.append('artistAlias', 'The Beatles');
            formData.append('sampleImage', ((this.fileItemForm.controls['image'] as FormGroup).controls['file'].value as FileItem)._file); // note comma separating key and value
            // formData.append('someField2', 'testValue1');
            const formGroup: FormGroup = this.formsMap.get(fileItem);
            formData.append('genre', (formGroup.controls['descriptionForm'] as FormGroup).controls['genre'].value as string);
            ((formGroup.controls['descriptionForm'] as FormGroup).controls['moods'].value as string []).forEach((mood) => {
                formData.append('moods', mood);
            });
            ((formGroup.controls['descriptionForm'] as FormGroup).controls['tags'].value as string []).forEach((tag) => {
                formData.append('tags', tag);
            });
            formData.append('sampleTitle', (formGroup.controls['descriptionForm'] as FormGroup).controls['sampleTitle'].value as string);
            formData.append('tempo', (formGroup.controls['descriptionForm'] as FormGroup).controls['tempo'].value);
            // formData.append('genre', (formGroup.controls['descriptionForm'] as FormGroup).controls['moods'].value as string);
            // form.append('genre', JSON.stringify(this.fileItemForm.));
        };


        this.uploader.onAfterAddingFile = (fileItem: FileItem) => {
            if (this.uploader.queue.length === 1) {
                this.audioService.loadBlob(fileItem._file);
            }
            // console.log(this.uploader.queue.length)
            // this.audioService.load(this.uploader.queue[0]._file);
            console.log(fileItem);
            this.formsMap.set(fileItem, this.buildFileItemForm());
            this.formsSubject.next(this.formsMap);
            const snackbarConfig: MatSnackBarConfig = new MatSnackBarConfig();
            snackbarConfig.duration = 2000;
            snackbarConfig.panelClass = 'snackbar';
            this._snackbar.open(`Your want to upload ${this.formsMap.size} samples`, 'Cool.', snackbarConfig);
        };

        this.imageUploader.onAfterAddingFile = (fileItem: FileItem) => {
            (this.fileItemForm.controls['image'] as FormGroup).controls['file'].setValue(fileItem);
            console.log((this.fileItemForm.controls['image'] as FormGroup).controls['file'].value);
        };

      // tslint:disable-next-line:no-shadowed-variable
        this.uploader.onWhenAddingFileFailed = (item, filter) => {
            console.log('OnWhenAddingFileFailed');
            console.log(item);
            console.log(filter);
        };

        this.uploader.onErrorItem = (item, res, status, headers) => {
            console.log('onErrorItem');
        };

        setTimeout(() => {
            this.audioService.createWavesurferObj();
        });


        // this.uploader.onBuildItemForm = ()


        // let password = new FormControl('', Validators.required);
        // let confirmPassword = new FormControl('', CustomValidators.equalTo(password));

        // this.basicForm = new FormGroup({
        //   username: new FormControl('', [
        //     Validators.minLength(4),
        //     Validators.maxLength(9)
        //   ]),
        //   firstname: new FormControl('', [
        //     Validators.required
        //   ]),
        //   email: new FormControl('', [
        //     Validators.required,
        //     Validators.email
        //   ]),
        //   website: new FormControl('', CustomValidators.url),
        //   date: new FormControl(),
        //   cardno: new FormControl('', [
        //     CustomValidators.creditCard
        //   ]),
        //   password: password,
        //   confirmPassword: confirmPassword,
        //   gender: new FormControl('', [
        //     Validators.required
        //   ]),
        //   agreed: new FormControl('', (control: FormControl) => {
        //     const agreed = control.value;
        //     if(!agreed) {
        //       return { agreed: true }
        //     }
        //     return null;
        //   })
        // })
    }

    ngOnDestroy(): void {
        this.playStateControlService.emitPlayState(false);
    }

    playFileItem(isCurrentSample: boolean, sampleIndex: number, item: FileItem) {
        if (isCurrentSample) {
            // if(this.uploader.queue.length === 0) {

            // }
            // this.audioService.load(item._file);
            this.playStateControlService.emitPlayState(true);
            this.audioService.play();
        } else {
            this.playStateControlService.emitPlayState(true);
            this.currentSampleSubject$.next(sampleIndex);
            this.audioService.loadBlob(item._file);
            // this.playStateControlService.emitCurrentSampleID(sampleID);
        }
    }

    pauseFileItem(isCurrentSample: boolean, sampleIndex: number, item: FileItem) {
        if (isCurrentSample) {
            this.playStateControlService.emitPlayState(false);
            this.audioService.pause();
        } else {
            this.currentSampleSubject$.next(sampleIndex);
            // this.playStateControlService.emitCurrentSampleID(sample);
            // this.audioService.loadPlayAudio(sampleOwnerID, sampleName);
            this.audioService.loadBlob(item._file);
        }
    }


    public buildFileItemForm(): FormGroup {

        this.fileItemForm = this.fb.group({
            'descriptionForm': this.fb.group({
                'sampleTitle': ['', [
                    Validators.required,
                    Validators.maxLength(this.maximumSampleTitle)]
                ],
                'genre': ['', Validators.required],
                'moods': [[], [
                    Validators.required,
                    Validators.minLength(this.minimumMoods),
                    Validators.maxLength(this.maximumMoods)]
                ],
                'tags': [[], [
                    Validators.required,
                    Validators.minLength(this.minimumTags),
                    Validators.maxLength(this.maximumTags)]
                ],
                'tempo': [0, [
                    Validators.required,
                    Validators.min(this.minimumBPM),
                    Validators.max(this.maximumBPM)]
                ]
            }),
            'image': this.fb.group({
                'file': [null, [
                    Validators.required
                ]]
            }),
            'mixedIn': this.fb.group({
                'audioUnits': [[]]
            }),
            'ownershipDeclaration': this.fb.control('', [Validators.required])
        });

        console.log((this.fileItemForm.controls['descriptionForm'] as FormGroup).controls['tempo']);

        return this.fileItemForm;


        // this.basicForm = new FormGroup({
        //   sampleTitle: new FormControl('', [
        //     Validators.minLength(4),
        //     Validators.maxLength(30)
        //   ]),
        //   genre: new FormControl('', [
        //     Validators.required
        //   ]),
        //   songKey: new FormControl('', [
        //     Validators.required
        //   ]),
        //   trackType: new FormControl('', [Validators.required]),
        //   mixedSamples: new FormControl('', Validators.required),
        //   bpm: new FormControl('', [
        //     Validators.required]),
        //   description: new FormControl('', [
        //     Validators.required
        //   ]),
        //   agreed: new FormControl('', (control: FormControl) => {
        //     const agreed = control.value;
        //     if (!agreed) {
        //       return { agreed: true }
        //     }
        //     return null;
        //   })
        // })
        // return this.basicForm;
    }

    // https://stackblitz.com/edit/angular-material-v9-mat-select-with-mat-chip-list?file=src%2Fapp%2Fselect-multiple-example.html
    onMoodRemoved(mood: string, item: FileItem): void {
        const formGroup: FormGroup = this.formsMap.get(item);
        const selectedMoods: string [] = (formGroup.controls['descriptionForm'] as FormGroup).controls['moods'].value as string [];
        //  this.toppingsControl.value as string[];
        this.removeFirst(selectedMoods, mood);
        (formGroup.controls['descriptionForm'] as FormGroup).controls['moods'].setValue(selectedMoods); // To trigger change detection
    }

    onTagRemoved(tag: string, item: FileItem): void {
        const formGroup: FormGroup = this.formsMap.get(item);
        const selectedMoods: string [] = (formGroup.controls['descriptionForm'] as FormGroup).controls['tags'].value as string [];
        //  this.toppingsControl.value as string[];
        this.removeFirst(selectedMoods, tag);
        (formGroup.controls['descriptionForm'] as FormGroup).controls['tags'].setValue(selectedMoods); // To trigger change detection
    }

    add(event: MatChipInputEvent, fileItem: FileItem): void {
        const formGroup: FormGroup = this.formsMap.get(fileItem);
        const input = event.input;
        const value = event.value;

        // Add our fruit
        if ((value || '').trim()) {
            (formGroup.controls['descriptionForm'] as FormGroup).controls['tags'].value.push(value.trim());
        }
        formGroup.updateValueAndValidity();
        this.changeDetectorRef.detectChanges();
        // Reset the input value
        if (input) {
            input.value = '';
        }
        // setTimeout(() => {
        const selectedTags: string [] = (formGroup.controls['descriptionForm'] as FormGroup).controls['tags'].value as string [];
        (formGroup.controls['descriptionForm'] as FormGroup).controls['tags'].setValue(selectedTags); // To trigger change detection
        console.log('Chip added');
        (formGroup.controls['descriptionForm'] as FormGroup).controls['tags'].markAsTouched;
        // this.changeDetectorRef.detectChanges();
        // },1000);

    }

    private removeFirst<T>(array: T[], toRemove: T): void {
        const index = array.indexOf(toRemove);
        if (index !== -1) {
            array.splice(index, 1);
        }
    }

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    onFileSelected(event) {
        console.log(event);
    }


    upload(item: FileItem) {
        console.log(item);
        console.log(this.formsMap.get(item));
    }


    // selected(event: MatAutocompleteSelectedEvent): void {
    //   this.fruits.push(event.option.viewValue);
    //   this.fruitInput.nativeElement.value = '';
    //   this.fruitCtrl.setValue(null);
    // }

    // private _filter(value: string): string[] {
    //   const filterValue = value.toLowerCase();

    //   return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
    // }


    // addTag(event: MatChipInputEvent): void {
    //   const input = event.input;
    //   const value = event.value;

    //   // Add our fruit
    //   if ((value || '').trim()) {
    //     this.fruits.push({name: value.trim()});
    //   }

    //   // Reset the input value
    //   if (input) {
    //     input.value = '';
    //   }
    // }

    // removeTag(tag: string): void {
    //   const index = this.fruits.indexOf(tag);

    //   if (index >= 0) {
    //     this.fruits.splice(index, 1);
    //   }
    // }


}
